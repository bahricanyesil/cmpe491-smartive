import Button from '@mui/material/Button';
import CodeEditor from '@uiw/react-textarea-code-editor';
import React from 'react';
import './source_code_view.css';

const SourceCodeView = ({contractName, contractCode}) => {
  const [code, setCode] = React.useState(
    contractCode
  );
    return (
      <div data-color-mode="dark">
      <div style={{display:'flex', justifyContent: 'space-between', marginBottom:'7px' }}>
        <h3>{contractName}</h3>
        <Button onClick={() =>  navigator.clipboard.writeText(contractCode)} variant="contained">Copy</Button>
      </div>
      <CodeEditor
        value={code}
        language="solidity"
        onCopy={(code) => {}}
        placeholder="Please enter JS code."
        onChange={(evn) => setCode(evn.target.value)}
        padding={15}
        style={{
          fontFamily:
            "ui-monospace,SFMono-Regular,SF Mono,Consolas,Liberation Mono,Menlo,monospace",
          fontSize: 12
        }}
      />
    </div>
    );

};
export default SourceCodeView;