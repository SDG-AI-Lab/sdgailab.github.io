import { useEffect, useState, useCallback } from 'react';
import { ContentTable, type Column } from '../shared/ContentTable';
import { ConfirmDialog } from '../shared/ConfirmDialog';
import { listPeople, archivePerson, deletePerson } from '../../../lib/admin-queries';
import { useToast } from '../layout/Toast';
import type { Person } from '../../../lib/types';

type Filter = 'all' | 'team' | 'advisory_board';

export default function PeopleListPage() {
  const { showToast } = useToast();
  const [data, setData] = useState<Person[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState<Filter>('all');
  const [confirmState, setConfirmState] = useState<{ isOpen: boolean; itemId: string | null }>({
    isOpen: false,
    itemId: null,
  });
  const [deleteLoading, setDeleteLoading] = useState(false);

  const columns: Column<Person>[] = [
    { label: 'Name', accessor: 'name' },
    { label: 'Role', accessor: 'role_title' },
    {
      label: 'Group',
      accessor: (item) => (item.group_type === 'team' ? 'Team' : 'Advisory Board'),
    },
    { label: 'Status', accessor: 'status' },
    { label: 'Order', accessor: 'display_order' },
  ];

  const fetchList = useCallback(async () => {
    setLoading(true);
    setError(null);
    const { data: result, error: err } = await listPeople();
    setLoading(false);
    if (err) {
      setError(err);
      setData([]);
    } else {
      setData(result ?? []);
    }
  }, []);

  useEffect(() => {
    fetchList();
  }, [fetchList]);

  const filteredData =
    filter === 'all'
      ? data
      : data.filter((p) => p.group_type === filter);

  const onEdit = (id: string) => {
    window.location.hash = `#/people/edit/${id}`;
  };

  const onArchive = async (id: string) => {
    const { error: err } = await archivePerson(id);
    if (err) {
      showToast(err, 'error');
    } else {
      showToast('Person archived', 'success');
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
    const { error: err } = await deletePerson(id);
    setDeleteLoading(false);
    if (err) {
      showToast(err, 'error');
    } else {
      showToast('Person deleted permanently', 'success');
      setConfirmState({ isOpen: false, itemId: null });
      fetchList();
    }
  };

  const handleCancelDelete = () => {
    setConfirmState({ isOpen: false, itemId: null });
  };

  return (
    <div>
      <h1 className="text-2xl font-semibold text-gray-800 mb-6">People</h1>
      <div className="flex gap-2 mb-4">
        <button
          type="button"
          onClick={() => setFilter('all')}
          className={`px-3 py-1.5 rounded-md text-sm font-medium ${
            filter === 'all' ? 'bg-primary text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          All
        </button>
        <button
          type="button"
          onClick={() => setFilter('team')}
          className={`px-3 py-1.5 rounded-md text-sm font-medium ${
            filter === 'team' ? 'bg-primary text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          Team
        </button>
        <button
          type="button"
          onClick={() => setFilter('advisory_board')}
          className={`px-3 py-1.5 rounded-md text-sm font-medium ${
            filter === 'advisory_board' ? 'bg-primary text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          Advisory Board
        </button>
      </div>
      <ContentTable
        columns={columns}
        data={filteredData}
        loading={loading}
        error={error}
        onEdit={onEdit}
        onArchive={onArchive}
        onDelete={onDelete}
        onRetry={fetchList}
        addNewHref="#/people/new"
      />
      <ConfirmDialog
        isOpen={confirmState.isOpen}
        title="Delete Person"
        message="This will permanently delete this person. This action cannot be undone."
        onConfirm={handleConfirmDelete}
        onCancel={handleCancelDelete}
        loading={deleteLoading}
      />
    </div>
  );
}
