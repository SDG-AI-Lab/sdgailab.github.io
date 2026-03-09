interface FormFeedbackProps {
  message: string | null;
  type: 'success' | 'error';
}

export function FormFeedback({ message, type }: FormFeedbackProps) {
  if (!message?.trim()) return null;

  const styles =
    type === 'success'
      ? 'bg-green-50 text-green-700 border border-green-200'
      : 'bg-red-50 text-red-700 border border-red-200';

  return (
    <div className={`rounded-md p-3 text-sm my-3 ${styles}`} role="alert">
      {message}
    </div>
  );
}
