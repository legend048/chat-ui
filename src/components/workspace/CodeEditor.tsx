import { getLanguageFromFilename } from '../../utils/fileUtils';
import { MonacoEditor } from './MonacoEditor';

interface CodeEditorProps {
  content: string;
  filename: string;
  onChange?: (value: string) => void;
}

export function CodeEditor({ content, filename, onChange }: CodeEditorProps) {
  const language = getLanguageFromFilename(filename);

  return (
    <div className="flex-1 flex flex-col bg-gray-900">
      <div className="border-b border-gray-800 px-4 py-2">
        <span className="text-sm text-gray-400">{filename}</span>
      </div>
      <div className="flex-1">
        <MonacoEditor
          content={content}
          language={language}
          onChange={onChange}
        />
      </div>
    </div>
  );
}