import { useState } from 'react';

interface CreateFileModalProps {
  type: 'file' | 'folder';
  basePath: string;
  onClose: () => void;
  onCreate: (name: string) => void;
}

export function CreateFileModal({ type, basePath, onClose, onCreate }: CreateFileModalProps) {
  const [name, setName] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim()) {
      onCreate(name.trim());
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
      <div className="bg-gray-800 p-6 rounded-lg w-96">
        <h2 className="text-lg font-semibold mb-4">Create New {type === 'file' ? 'File' : 'Folder'}</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm text-gray-400 mb-2">
              {type === 'file' ? 'File Name' : 'Folder Name'}
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder={type === 'file' ? 'example.ts' : 'example'}
              className="w-full px-3 py-2 bg-gray-700 rounded border border-gray-600 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              autoFocus
            />
            {basePath && (
              <p className="mt-2 text-sm text-gray-500">
                Will be created in: {basePath}
              </p>
            )}
          </div>
          <div className="flex justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm text-gray-400 hover:text-white"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-sm bg-blue-500 hover:bg-blue-600 rounded"
            >
              Create
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}