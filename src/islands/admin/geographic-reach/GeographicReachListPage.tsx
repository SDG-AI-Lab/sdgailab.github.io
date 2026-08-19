import { useEffect, useState } from 'react';
import { ContentTable, type Column } from '../shared/ContentTable';
import { ConfirmDialog } from '../shared/ConfirmDialog';
import {
  archiveGeographicReachItem,
  deleteGeographicReachItem,
  listGeographicReach,
} from '../../../lib/admin-queries';
import { useToast } from '../layout/Toast';
import type { GeographicReachItem } from '../../../lib/types';

export default function GeographicReachListPage() {
  const { showToast } = useToast();
  const [data, setData] = useState<GeographicReachItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [confirmState, setConfirmState] = useState<{ isOpen: boolean; itemId: string | null }>({
    isOpen: false,
    itemId: null,
  });
  const [deleteLoading, setDeleteLoading] = useState(false);

  const columns: Column<GeographicReachItem>[] = [
    { label: 'Country / Territory', accessor: 'country_name' },
    { label: 'ISO', accessor: (item) => item.iso_alpha3 ?? '' },
    { label: 'Coordinates', accessor: (item) => item.latitude != null && item.longitude != null ? `${item.latitude}, ${item.longitude}` : '' },
    { label: 'Region', accessor: (item) => item.region ?? '' },
    { label: 'Status', accessor: 'status' },
    { label: 'Order', accessor: 'display_order' },
  ];

  const fetchList = async () => {
    setLoading(true);
    setError(null);
    const { data: result, error: err } = await listGeographicReach();
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
    window.location.hash = `#/geographic-reach/edit/${id}`;
  };

  const onArchive = async (id: string) => {
    const { error: err } = await archiveGeographicReachItem(id);
    if (err) {
      showToast(err, 'error');
    } else {
      showToast('Geographic reach item archived', 'success');
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
    const { error: err } = await deleteGeographicReachItem(id);
    setDeleteLoading(false);
    if (err) {
      showToast(err, 'error');
    } else {
      showToast('Geographic reach item deleted permanently', 'success');
      setConfirmState({ isOpen: false, itemId: null });
      fetchList();
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-semibold text-lab-text mb-2">Geographic Reach</h1>
      <p className="mb-6 text-sm text-lab-muted">
        Manage the countries or territories shown in the homepage ?Where we work? section.
      </p>
      <ContentTable
        columns={columns}
        data={data}
        loading={loading}
        error={error}
        onEdit={onEdit}
        onArchive={onArchive}
        onDelete={onDelete}
        onRetry={fetchList}
        addNewHref="#/geographic-reach/new"
        addNewLabel="Add Country"
      />
      <ConfirmDialog
        isOpen={confirmState.isOpen}
        title="Delete Geographic Reach Item"
        message="This will permanently delete this country or territory from the CMS list. This action cannot be undone."
        onConfirm={handleConfirmDelete}
        onCancel={() => setConfirmState({ isOpen: false, itemId: null })}
        loading={deleteLoading}
      />
    </div>
  );
}
