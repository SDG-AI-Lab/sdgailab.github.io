interface StatusSelectProps {
  value: string;
  onChange: (value: string) => void;
  label?: string;
  id?: string;
}

export function StatusSelect({ value, onChange, label, id }: StatusSelectProps) {
  const selectId = id ?? 'status-select';
  return (
    <div>
      {label && (
        <label htmlFor={selectId} className="block text-sm font-medium text-gray-700 mb-1">
          {label}
        </label>
      )}
      <select
        id={selectId}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="border rounded px-3 py-2 text-sm border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
      >
        <option value="draft">Draft</option>
        <option value="published">Published</option>
        <option value="archived">Archived</option>
      </select>
    </div>
  );
}

interface StatusBadgeProps {
  status: string;
}

function getStatusStyles(status: string) {
  switch (status.toLowerCase()) {
    case 'draft':
      return 'bg-gray-100 text-gray-600';
    case 'published':
      return 'bg-green-100 text-green-700';
    case 'archived':
      return 'bg-red-100 text-red-600';
    default:
      return 'bg-gray-100 text-gray-600';
  }
}

export function StatusBadge({ status }: StatusBadgeProps) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium capitalize ${getStatusStyles(status)}`}
    >
      {status}
    </span>
  );
}
