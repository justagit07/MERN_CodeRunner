import React, { useState } from "react";
import { Controlled as ControlledEditor } from "react-codemirror2";

const CodeEditor = ({ language, value, onChange }) => {
  const [editor, setEditor] = useState(null);

  const handleEditorDidMount = (editor, monaco) => {
    setEditor(editor);
  };

  const handleEditorChange = (value) => {
    onChange(value);
  };

  return (
    <ControlledEditor
      language={language}
      value={value}
      onChange={handleEditorChange}
      editorDidMount={handleEditorDidMount}
      options={{
        selectOnLineNumbers: true,
        readOnly: false,
        automaticLayout: true,
        tabSize: 2,
        fontSize: 14,
      }}
    />
  );
};

export default CodeEditor;
