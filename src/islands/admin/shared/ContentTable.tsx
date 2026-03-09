import type React from 'react';
import { StatusBadge } from './StatusSelect';

export interface Column<T> {
  label: string;
  accessor: keyof T | ((item: T) => React.ReactNode);
  className?: string;
}

export interface ContentTableProps<T extends { id: string; status: string }> {
  columns: Column<T>[];
  data: T[];
  loading: boolean;
  error: string | null;
  onEdit: (id: string) => void;
  onArchive: (id: string) => void;
  onDelete: (id: string) => void;
  onRetry?: () => void;
  addNewHref: string;
  addNewLabel?: string;
}

function getCellContent<T>(item: T, accessor: Column<T>['accessor']): React.ReactNode {
  if (typeof accessor === 'function') {
    return accessor(item);
  }
  const value = item[accessor];
  return value != null ? String(value) : '';
}

export function ContentTable<T extends { id: string; status: string }>({
  columns,
  data,
  loading,
  error,
  onEdit,
  onArchive,
  onDelete,
  onRetry,
  addNewHref,
  addNewLabel = 'Add New',
}: ContentTableProps<T>) {
  const hasStatus = columns.some((c) => c.accessor === 'status');
  const allColumns: Column<T>[] = hasStatus
    ? columns
    : [...columns, { label: 'Status', accessor: 'status' as keyof T }];

  const addButton = (
    <div className="flex justify-end mb-4">
      <a
        href={addNewHref}
        className="inline-flex items-center px-4 py-2 rounded-md bg-primary text-white text-sm font-medium hover:bg-primary/90"
      >
        {addNewLabel}
      </a>
    </div>
  );

  if (loading) {
    return (
      <div className="overflow-x-auto">
        {addButton}
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              {allColumns.map((col, i) => (
                <th
                  key={i}
                  scope="col"
                  className={`px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider ${col.className ?? ''}`}
                >
                  {col.label}
                </th>
              ))}
              <th scope="col" className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {[1, 2, 3, 4, 5].map((i) => (
              <tr key={i}>
                {allColumns.map((col, j) => (
                  <td key={j} className="px-4 py-3">
                    <div className="h-4 bg-gray-200 rounded animate-pulse" />
                  </td>
                ))}
                <td className="px-4 py-3">
                  <div className="h-4 bg-gray-200 rounded animate-pulse w-16" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }

  if (error) {
    return (
      <div>
        {addButton}
        <div className="rounded-md bg-red-50 p-4 text-red-700 text-sm">
          <p>{error}</p>
          {onRetry && (
            <button
              type="button"
              onClick={onRetry}
              className="mt-2 text-red-800 font-medium underline hover:no-underline"
            >
              Retry
            </button>
          )}
        </div>
      </div>
    );
  }

  if (!data.length) {
    return (
      <div>
        {addButton}
        <div className="text-center py-12 text-gray-500">
          No items found
        </div>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      {addButton}
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            {allColumns.map((col, i) => (
              <th
                key={i}
                scope="col"
                className={`px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider ${col.className ?? ''}`}
              >
                {col.label}
              </th>
            ))}
            <th scope="col" className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {data.map((item) => (
            <tr key={item.id}>
              {allColumns.map((col, i) => (
                <td key={i} className={`px-4 py-3 text-sm text-gray-900 ${col.className ?? ''}`}>
                  {col.accessor === 'status' ? (
                    <StatusBadge status={item.status} />
                  ) : (
                    getCellContent(item, col.accessor)
                  )}
                </td>
              ))}
              <td className="px-4 py-3 text-right">
                <div className="flex justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => onEdit(item.id)}
                    className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                  >
                    Edit
                  </button>
                  {item.status !== 'archived' && (
                    <button
                      type="button"
                      onClick={() => onArchive(item.id)}
                      className="text-yellow-600 hover:text-yellow-800 text-sm font-medium"
                    >
                      Archive
                    </button>
                  )}
                  {item.status === 'archived' && (
                    <button
                      type="button"
                      onClick={() => onDelete(item.id)}
                      className="text-red-600 hover:text-red-800 text-sm font-medium"
                    >
                      Delete
                    </button>
                  )}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
