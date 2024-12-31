export function getLanguageFromFilename(filename: string): string {
  const extension = filename.split('.').pop()?.toLowerCase();
  
  switch (extension) {
    case 'js':
    case 'jsx':
      return 'javascript';
    case 'ts':
    case 'tsx':
      return 'typescript';
    case 'css':
      return 'css';
    case 'html':
      return 'html';
    case 'json':
      return 'json';
    case 'md':
      return 'markdown';
    default:
      return 'plaintext';
  }
}

export function addFileToTree(
  files: FileItem[],
  path: string,
  name: string,
  type: 'file' | 'folder'
): FileItem[] {
  const parts = path ? path.split('/') : [];
  
  function addToLevel(items: FileItem[], depth: number): FileItem[] {
    if (depth === parts.length) {
      const newPath = path ? `${path}/${name}` : name;
      return [...items, { name, type, path: newPath, children: type === 'folder' ? [] : undefined }];
    }

    return items.map(item => {
      if (item.name === parts[depth] && item.type === 'folder') {
        return {
          ...item,
          children: addToLevel(item.children || [], depth + 1)
        };
      }
      return item;
    });
  }

  return addToLevel(files, 0);
}