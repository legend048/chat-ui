export interface FileItem {
  name: string;
  type: 'file' | 'folder';
  children?: FileItem[];
  path: string;
}

export interface OpenFile {
  path: string;
  content: string;
}