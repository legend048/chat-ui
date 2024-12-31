import { useState } from 'react';
import { Header } from '../components/Header';
import { FileExplorer } from '../components/workspace/FileExplorer';
import { CodeEditor } from '../components/workspace/CodeEditor';
import { EditorTabs } from '../components/workspace/EditorTabs';
import { CreateFileModal } from '../components/workspace/CreateFileModal';
import { FileItem } from '../types/workspace';
import { addFileToTree } from '../utils/fileUtils';
import { initialFiles, mockFileContents } from '../config/workspaceConfig';

interface WorkspacePageProps {
  framework: string;
  prompt: string;
}

export function WorkspacePage({ framework, prompt }: WorkspacePageProps) {
  const [files, setFiles] = useState(initialFiles);
  const [activeFile, setActiveFile] = useState<string | null>(null);
  const [openFiles, setOpenFiles] = useState<string[]>([]);
  const [fileContents, setFileContents] = useState(mockFileContents);
  const [createModal, setCreateModal] = useState<{
    type: 'file' | 'folder';
    path: string;
  } | null>(null);

  const handleFileSelect = (path: string) => {
    if (!openFiles.includes(path)) {
      setOpenFiles([...openFiles, path]);
    }
    setActiveFile(path);
  };

  const handleFileClose = (path: string) => {
    const newOpenFiles = openFiles.filter(f => f !== path);
    setOpenFiles(newOpenFiles);
    if (activeFile === path) {
      setActiveFile(newOpenFiles[newOpenFiles.length - 1] || null);
    }
  };

  const handleFileChange = (newContent: string) => {
    if (activeFile) {
      setFileContents(prev => ({
        ...prev,
        [activeFile]: newContent
      }));
    }
  };

  const handleCreateFile = (path: string) => {
    setCreateModal({ type: 'file', path });
  };

  const handleCreateFolder = (path: string) => {
    setCreateModal({ type: 'folder', path });
  };

  const handleCreate = (name: string) => {
    if (!createModal) return;

    const { type, path } = createModal;
    const newFiles = addFileToTree(files, path, name, type);
    setFiles(newFiles);

    if (type === 'file') {
      const fullPath = path ? `${path}/${name}` : name;
      setFileContents(prev => ({
        ...prev,
        [fullPath]: ''
      }));
      handleFileSelect(fullPath);
    }
  };

  return (
    <div className="h-screen flex flex-col bg-gray-900 text-white">
      <Header />
      
      <div className="flex-1 flex overflow-hidden">
        <FileExplorer 
          files={files} 
          onFileSelect={handleFileSelect}
          onCreateFile={handleCreateFile}
          onCreateFolder={handleCreateFolder}
        />
        
        <div className="flex-1 flex flex-col">
          <EditorTabs
            openFiles={openFiles}
            activeFile={activeFile}
            onSelectFile={setActiveFile}
            onCloseFile={handleFileClose}
          />
          
          {activeFile ? (
            <CodeEditor
              filename={activeFile}
              content={fileContents[activeFile] || ''}
              onChange={handleFileChange}
            />
          ) : (
            <div className="flex-1 flex items-center justify-center text-gray-500">
              Select a file to view its contents
            </div>
          )}
        </div>
      </div>

      <div className="bg-gray-800/50 border-t border-gray-800 px-4 py-2 text-sm text-gray-400">
        {framework} project • {prompt}
      </div>

      {createModal && (
        <CreateFileModal
          type={createModal.type}
          basePath={createModal.path}
          onClose={() => setCreateModal(null)}
          onCreate={handleCreate}
        />
      )}
    </div>
  );
}