import React, { useState } from "react";
import Editor from "@monaco-editor/react";
import styled from "styled-components";

const CodeEditorContainer = styled.main`
  border-radius: 0.375rem;
  overflow: hidden;
  width: 100%;
  height: 100%;    
`
const CodeEditorWindow = ({ onChange, language, code, theme }) => {
  const [value, setValue] = useState(code || "");

  const handleEditorChange = (value) => {
    setValue(value);
    onChange("code", value);
  };

  return (
    <CodeEditorContainer> 
      <Editor
        height="85vh"
        width={`100%`}
        language={language || "javascript"}
        value={value}
        theme={theme}
        defaultValue="// some comment"
        onChange={handleEditorChange}
      />
    </CodeEditorContainer>
  );
};
export default CodeEditorWindow;