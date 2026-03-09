import { useEffect, useState } from 'react';
import { ContentTable, type Column } from '../shared/ContentTable';
import { ConfirmDialog } from '../shared/ConfirmDialog';
import { listNewsArticles, archiveNewsArticle, deleteNewsArticle } from '../../../lib/admin-queries';
import { useToast } from '../layout/Toast';
import type { NewsArticle } from '../../../lib/types';

export default function NewsListPage() {
  const { showToast } = useToast();
  const [data, setData] = useState<NewsArticle[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [confirmState, setConfirmState] = useState<{ isOpen: boolean; itemId: string | null }>({
    isOpen: false,
    itemId: null,
  });
  const [deleteLoading, setDeleteLoading] = useState(false);

  const columns: Column<NewsArticle>[] = [
    { label: 'Title', accessor: 'title' },
    {
      label: 'Author',
      accessor: (item) => item.author_name || '—',
    },
    { label: 'Publish Date', accessor: 'publish_date' },
    { label: 'Status', accessor: 'status' },
  ];

  const fetchList = async () => {
    setLoading(true);
    setError(null);
    const { data: result, error: err } = await listNewsArticles();
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
    window.location.hash = `#/news/edit/${id}`;
  };

  const onArchive = async (id: string) => {
    const { error: err } = await archiveNewsArticle(id);
    if (err) {
      showToast(err, 'error');
    } else {
      showToast('Article archived', 'success');
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
    const { error: err } = await deleteNewsArticle(id);
    setDeleteLoading(false);
    if (err) {
      showToast(err, 'error');
    } else {
      showToast('Article deleted permanently', 'success');
      setConfirmState({ isOpen: false, itemId: null });
      fetchList();
    }
  };

  const handleCancelDelete = () => {
    setConfirmState({ isOpen: false, itemId: null });
  };

  return (
    <div>
      <h1 className="text-2xl font-semibold text-gray-800 mb-6">News Articles</h1>
      <ContentTable
        columns={columns}
        data={data}
        loading={loading}
        error={error}
        onEdit={onEdit}
        onArchive={onArchive}
        onDelete={onDelete}
        onRetry={fetchList}
        addNewHref="#/news/new"
      />
      <ConfirmDialog
        isOpen={confirmState.isOpen}
        title="Delete Article"
        message="This will permanently delete this article. This action cannot be undone."
        onConfirm={handleConfirmDelete}
        onCancel={handleCancelDelete}
        loading={deleteLoading}
      />
    </div>
  );
}
