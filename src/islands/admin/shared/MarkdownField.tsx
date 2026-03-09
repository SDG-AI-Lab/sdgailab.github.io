import MDEditor, { commands } from '@uiw/react-md-editor';
import { marked } from 'marked';

interface MarkdownFieldProps {
  value: string;
  onChange: (value: string) => void;
  label?: string;
}

const simplifiedCommands = [
  commands.bold,
  commands.italic,
  commands.title1,
  commands.title2,
  commands.title3,
  commands.divider,
  commands.link,
  commands.unorderedListCommand,
  commands.orderedListCommand,
  commands.divider,
  commands.image,
  commands.codePreview,
];

export function MarkdownField({
  value,
  onChange,
  label = 'Content',
}: MarkdownFieldProps) {
  return (
    <div data-color-mode="light" className="mb-4">
      {label && (
        <label className="mb-2 block text-sm font-medium text-gray-700">
          {label}
        </label>
      )}
      <MDEditor
        value={value}
        onChange={(val) => onChange(val ?? '')}
        height={300}
        preview="live"
        commands={simplifiedCommands}
        components={{
          preview: (source) => (
            <div
              className="wmde-markdown"
              dangerouslySetInnerHTML={{ __html: marked.parse(source) as string }}
            />
          ),
        }}
      />
    </div>
  );
}
