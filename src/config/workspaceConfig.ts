import { FileItem } from '../types/workspace';

function buildFilePath(item: FileItem, parentPath: string = ''): FileItem {
  const path = parentPath ? `${parentPath}/${item.name}` : item.name;
  return {
    ...item,
    path,
    children: item.children?.map(child => buildFilePath(child, path))
  };
}

export const initialFiles: FileItem[] = [
  buildFilePath({
    name: 'src',
    type: 'folder',
    children: [
      { name: 'App.tsx', type: 'file' },
      { name: 'main.tsx', type: 'file' },
      { name: 'index.css', type: 'file' },
    ],
  }),
  buildFilePath({ name: 'package.json', type: 'file' }),
  buildFilePath({ name: 'README.md', type: 'file' }),
];

export const mockFileContents: Record<string, string> = {
  'src/App.tsx': `import React from 'react';

function App() {
  return (
    <div className="min-h-screen bg-gray-100">
      <h1>Hello World</h1>
    </div>
  );
}

export default App;`,
  'src/main.tsx': `import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);`,
  'src/index.css': `@tailwind base;
@tailwind components;
@tailwind utilities;`,
  'package.json': `{
  "name": "my-project",
  "version": "1.0.0",
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0"
  }
}`,
  'README.md': `# Project Documentation

This project was generated based on your prompt.

## Getting Started

1. Install dependencies
\`\`\`bash
npm install
\`\`\`

2. Start the development server
\`\`\`bash
npm run dev
\`\`\`
`,
};