import { useEffect, useState } from 'react';
import { ContentTable, type Column } from '../shared/ContentTable';
import { ConfirmDialog } from '../shared/ConfirmDialog';
import { listPartners, archivePartner, deletePartner } from '../../../lib/admin-queries';
import { useToast } from '../layout/Toast';
import type { Partner } from '../../../lib/types';

export default function PartnersListPage() {
  const { showToast } = useToast();
  const [data, setData] = useState<Partner[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [confirmState, setConfirmState] = useState<{ isOpen: boolean; itemId: string | null }>({
    isOpen: false,
    itemId: null,
  });
  const [deleteLoading, setDeleteLoading] = useState(false);

  const columns: Column<Partner>[] = [
    { label: 'Name', accessor: 'name' },
    {
      label: 'Logo',
      accessor: (item) =>
        item.logo_url ? (
          <img src={item.logo_url} alt={item.name} className="h-8 w-auto object-contain" />
        ) : (
          '—'
        ),
    },
    {
      label: 'Website',
      accessor: (item) => (
        <a
          href={item.website_url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 underline truncate max-w-[200px] inline-block"
        >
          {item.website_url}
        </a>
      ),
    },
    { label: 'Status', accessor: 'status' },
    { label: 'Order', accessor: 'display_order' },
  ];

  const fetchList = async () => {
    setLoading(true);
    setError(null);
    const { data: result, error: err } = await listPartners();
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
    window.location.hash = `#/partners/edit/${id}`;
  };

  const onArchive = async (id: string) => {
    const { error: err } = await archivePartner(id);
    if (err) {
      showToast(err, 'error');
    } else {
      showToast('Partner archived', 'success');
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
    const { error: err } = await deletePartner(id);
    setDeleteLoading(false);
    if (err) {
      showToast(err, 'error');
    } else {
      showToast('Partner deleted permanently', 'success');
      setConfirmState({ isOpen: false, itemId: null });
      fetchList();
    }
  };

  const handleCancelDelete = () => {
    setConfirmState({ isOpen: false, itemId: null });
  };

  return (
    <div>
      <h1 className="text-2xl font-semibold text-gray-800 mb-6">Partners</h1>
      <ContentTable
        columns={columns}
        data={data}
        loading={loading}
        error={error}
        onEdit={onEdit}
        onArchive={onArchive}
        onDelete={onDelete}
        onRetry={fetchList}
        addNewHref="#/partners/new"
      />
      <ConfirmDialog
        isOpen={confirmState.isOpen}
        title="Delete Partner"
        message="This will permanently delete this partner. This action cannot be undone."
        onConfirm={handleConfirmDelete}
        onCancel={handleCancelDelete}
        loading={deleteLoading}
      />
    </div>
  );
}
