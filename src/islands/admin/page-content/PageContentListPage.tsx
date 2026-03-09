import { useEffect, useState } from 'react';
import { ContentTable, type Column } from '../shared/ContentTable';
import { ConfirmDialog } from '../shared/ConfirmDialog';
import { listPageContent, archivePageContent, deletePageContent } from '../../../lib/admin-queries';
import { useToast } from '../layout/Toast';
import type { PageContent } from '../../../lib/types';

export default function PageContentListPage() {
  const { showToast } = useToast();
  const [data, setData] = useState<PageContent[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [confirmState, setConfirmState] = useState<{ isOpen: boolean; itemId: string | null }>({
    isOpen: false,
    itemId: null,
  });
  const [deleteLoading, setDeleteLoading] = useState(false);

  const columns: Column<PageContent>[] = [
    { label: 'Page', accessor: 'page_slug' },
    { label: 'Section', accessor: 'section_slug' },
    { label: 'Status', accessor: 'status' },
  ];

  const fetchList = async () => {
    setLoading(true);
    setError(null);
    const { data: result, error: err } = await listPageContent();
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
    window.location.hash = `#/page-content/edit/${id}`;
  };

  const onArchive = async (id: string) => {
    const { error: err } = await archivePageContent(id);
    if (err) {
      showToast(err, 'error');
    } else {
      showToast('Content archived', 'success');
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
    const { error: err } = await deletePageContent(id);
    setDeleteLoading(false);
    if (err) {
      showToast(err, 'error');
    } else {
      showToast('Content deleted permanently', 'success');
      setConfirmState({ isOpen: false, itemId: null });
      fetchList();
    }
  };

  const handleCancelDelete = () => {
    setConfirmState({ isOpen: false, itemId: null });
  };

  return (
    <div>
      <h1 className="text-2xl font-semibold text-gray-800 mb-6">Page Content</h1>
      <ContentTable
        columns={columns}
        data={data}
        loading={loading}
        error={error}
        onEdit={onEdit}
        onArchive={onArchive}
        onDelete={onDelete}
        onRetry={fetchList}
        addNewHref="#/page-content/new"
      />
      <ConfirmDialog
        isOpen={confirmState.isOpen}
        title="Delete Page Content"
        message="This will permanently delete this content block. This action cannot be undone."
        onConfirm={handleConfirmDelete}
        onCancel={handleCancelDelete}
        loading={deleteLoading}
      />
    </div>
  );
}
