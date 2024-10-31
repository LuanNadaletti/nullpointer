declare module '@uiw/react-md-editor' {
  import React from 'react';
  
  interface MDEditorProps {
    value?: string;
    onChange?: (value?: string) => void;
    preview?: 'live' | 'edit' | 'preview';
    height?: number;
    className?: string;
  }
  
  const MDEditor: React.FC<MDEditorProps> & {
    Markdown: React.FC<{ source?: string }>;
  };
  
  export default MDEditor;
} 