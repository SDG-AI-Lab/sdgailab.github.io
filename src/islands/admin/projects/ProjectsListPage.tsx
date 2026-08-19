import { useEffect, useState } from 'react';
import { ContentTable, type Column } from '../shared/ContentTable';
import { ConfirmDialog } from '../shared/ConfirmDialog';
import { listProjects, archiveProject, deleteProject } from '../../../lib/admin-queries';
import { useToast } from '../layout/Toast';
import type { Project, ProjectStatus } from '../../../lib/types';

function ProjectStatusBadge({ status }: { status: ProjectStatus }) {
  const styles: Record<ProjectStatus, string> = {
    active: 'bg-green-500/15 text-green-200 border border-green-500/30',
    completed: 'bg-blue-100 text-blue-700',
    under_development: 'bg-yellow-100 text-yellow-700',
    on_hold: 'bg-lab-section text-lab-muted',
  };
  const label = status.replace(/_/g, ' ');
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium capitalize ${styles[status]}`}
    >
      {label}
    </span>
  );
}

export default function ProjectsListPage() {
  const { showToast } = useToast();
  const [data, setData] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [confirmState, setConfirmState] = useState<{ isOpen: boolean; itemId: string | null }>({
    isOpen: false,
    itemId: null,
  });
  const [deleteLoading, setDeleteLoading] = useState(false);

  const columns: Column<Project>[] = [
    { label: 'Title', accessor: 'title' },
    {
      label: 'Project Status',
      accessor: (item) => <ProjectStatusBadge status={item.project_status} />,
    },
    { label: 'Publish Status', accessor: 'status' },
    {
      label: 'Featured',
      accessor: (item) => (item.is_featured ? '✓' : '—'),
    },
    {
      label: 'Deployed',
      accessor: (item) => (item.is_deployed ? '✓' : '—'),
    },
    { label: 'Order', accessor: 'display_order' },
  ];

  const fetchList = async () => {
    setLoading(true);
    setError(null);
    const { data: result, error: err } = await listProjects();
    setLoading(false);
    if (err) {
      setError(err);
      setData([]);
    } else {
      setData(result ?? []);
    }
  };

  useEffect(() => {
    fetchList();
  }, []);

  const onEdit = (id: string) => {
    window.location.hash = `#/projects/edit/${id}`;
  };

  const onArchive = async (id: string) => {
    const { error: err } = await archiveProject(id);
    if (err) {
      showToast(err, 'error');
    } else {
      showToast('Project archived', 'success');
      fetchList();
    }
  };

  const onDelete = (id: string) => {
    setConfirmState({ isOpen: true, itemId: id });
  };

  const handleConfirmDelete = async () => {
    const id = confirmState.itemId;
    if (!id) return;
    setDeleteLoading(true);
    const { error: err } = await deleteProject(id);
    setDeleteLoading(false);
    if (err) {
      showToast(err, 'error');
    } else {
      showToast('Project deleted permanently', 'success');
      setConfirmState({ isOpen: false, itemId: null });
      fetchList();
    }
  };

  const handleCancelDelete = () => {
    setConfirmState({ isOpen: false, itemId: null });
  };

  return (
    <div>
      <h1 className="text-2xl font-semibold text-lab-text mb-6">Projects</h1>
      <ContentTable
        columns={columns}
        data={data}
        loading={loading}
        error={error}
        onEdit={onEdit}
        onArchive={onArchive}
        onDelete={onDelete}
        onRetry={fetchList}
        addNewHref="#/projects/new"
      />
      <ConfirmDialog
        isOpen={confirmState.isOpen}
        title="Delete Project"
        message="This will permanently delete this project. This action cannot be undone."
        onConfirm={handleConfirmDelete}
        onCancel={handleCancelDelete}
        loading={deleteLoading}
      />
    </div>
  );
}
