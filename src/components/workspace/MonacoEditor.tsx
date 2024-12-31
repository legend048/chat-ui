import { useRef } from 'react';
import Editor, { OnMount } from '@monaco-editor/react';

interface MonacoEditorProps {
  content: string;
  language: string;
  onChange?: (value: string) => void;
}

export function MonacoEditor({ content, language, onChange }: MonacoEditorProps) {
  const editorRef = useRef(null);

  const handleEditorDidMount: OnMount = (editor) => {
    editorRef.current = editor;
    editor.focus();
  };

  return (
    <Editor
      height="100%"
      defaultLanguage={language}
      defaultValue={content}
      theme="vs-dark"
      options={{
        minimap: { enabled: true },
        fontSize: 14,
        wordWrap: 'on',
        scrollBeyondLastLine: false,
        automaticLayout: true,
        padding: { top: 16 },
      }}
      onMount={handleEditorDidMount}
      onChange={(value) => onChange?.(value || '')}
    />
  );
}