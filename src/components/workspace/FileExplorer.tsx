import { File, Folder, Plus, FolderPlus } from 'lucide-react';
import { FileItem } from '../../types/workspace';

interface FileExplorerProps {
  files: FileItem[];
  onFileSelect: (path: string) => void;
  onCreateFile: (path: string) => void;
  onCreateFolder: (path: string) => void;
}

function FileTreeItem({ 
  item, 
  onFileSelect, 
  onCreateFile, 
  onCreateFolder,
  level = 0
}: { 
  item: FileItem; 
  onFileSelect: (path: string) => void;
  onCreateFile: (path: string) => void;
  onCreateFolder: (path: string) => void;
  level?: number;
}) {
  const basePath = item.type === 'folder' ? item.path : item.path.split('/').slice(0, -1).join('/');

  return (
    <div className="file-tree-item">
      <div 
        style={{ paddingLeft: `${level * 1.2}rem` }}
        className="group"
      >
        <div className="flex items-center justify-between pr-2">
          <button
            onClick={() => item.type === 'file' && onFileSelect(item.path)}
            className="flex-1 flex items-center space-x-2 px-2 py-1 hover:bg-gray-700/50 rounded-md text-sm text-gray-300 hover:text-white transition-colors"
          >
            {item.type === 'folder' ? (
              <Folder className="w-4 h-4 text-blue-400" />
            ) : (
              <File className="w-4 h-4 text-gray-400" />
            )}
            <span>{item.name}</span>
          </button>
          {item.type === 'folder' && (
            <div className="hidden group-hover:flex space-x-1">
              <button
                onClick={() => onCreateFile(basePath)}
                className="p-1 hover:bg-gray-700 rounded"
                title="New File"
              >
                <Plus className="w-3 h-3" />
              </button>
              <button
                onClick={() => onCreateFolder(basePath)}
                className="p-1 hover:bg-gray-700 rounded"
                title="New Folder"
              >
                <FolderPlus className="w-3 h-3" />
              </button>
            </div>
          )}
        </div>
      </div>
      {item.children?.map((child) => (
        <FileTreeItem
          key={`${child.path}-${child.type}`}
          item={child}
          onFileSelect={onFileSelect}
          onCreateFile={onCreateFile}
          onCreateFolder={onCreateFolder}
          level={level + 1}
        />
      ))}
    </div>
  );
}

export function FileExplorer({ files, onFileSelect, onCreateFile, onCreateFolder }: FileExplorerProps) {
  return (
    <div className="w-64 bg-gray-900 border-r border-gray-800 p-4 overflow-y-auto">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-sm font-medium text-gray-400">Explorer</h2>
        <div className="flex space-x-1">
          <button
            onClick={() => onCreateFile('')}
            className="p-1 hover:bg-gray-700 rounded"
            title="New File"
          >
            <Plus className="w-3 h-3" />
          </button>
          <button
            onClick={() => onCreateFolder('')}
            className="p-1 hover:bg-gray-700 rounded"
            title="New Folder"
          >
            <FolderPlus className="w-3 h-3" />
          </button>
        </div>
      </div>
      <div className="space-y-1">
        {files.map((file) => (
          <FileTreeItem 
            key={`${file.path}-${file.type}`}
            item={file} 
            onFileSelect={onFileSelect}
            onCreateFile={onCreateFile}
            onCreateFolder={onCreateFolder}
          />
        ))}
      </div>
    </div>
  );
}