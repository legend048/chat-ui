import { X } from 'lucide-react';

interface EditorTabsProps {
  openFiles: string[];
  activeFile: string | null;
  onSelectFile: (path: string) => void;
  onCloseFile: (path: string) => void;
}

export function EditorTabs({ openFiles, activeFile, onSelectFile, onCloseFile }: EditorTabsProps) {
  return (
    <div className="flex border-b border-gray-800 bg-gray-900/50">
      {openFiles.map((path) => (
        <div
          key={path}
          className={`group flex items-center space-x-2 px-4 py-2 border-r border-gray-800 cursor-pointer hover:bg-gray-800 ${
            activeFile === path ? 'bg-gray-800' : ''
          }`}
        >
          <button
            onClick={() => onSelectFile(path)}
            className="text-sm text-gray-400 hover:text-white"
          >
            {path.split('/').pop()}
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onCloseFile(path);
            }}
            className="opacity-0 group-hover:opacity-100 hover:text-white"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      ))}
    </div>
  );
}