import { CODE_TEMPLATE } from '@/utils/constants';
import { Divider, Select } from 'antd';
import React from 'react';
import MonacoEditor from 'react-monaco-editor';

type EditorProps = {
  code: string;
  setCode: React.Dispatch<React.SetStateAction<string>>;
  language: string;
  setLanguage: React.Dispatch<React.SetStateAction<string>>;
  coderHeight: string;
};

const Editor: React.FC<EditorProps> = ({ code, setCode, language, setLanguage, coderHeight }) => {
  const options: any = {
    selectOnLineNumbers: true,
    roundedSelection: false,
    readOnly: false,
    cursorStyle: 'line',
    scrollBeyondLastLine: false,
    scrollbar: {
      // 滚动条
      horizontalScrollbarSize: 8,
      verticalScrollbarSize: 8,
    },
    fontSize: 18,
    tabSize: 4,
    minimap: {
      enabled: false,
    },
    automaticLayout: true,
  };

  return (
    <>
      <div>
        <Select
          size="small"
          value={language}
          onChange={(value) => {
            setLanguage(value);
            setCode(CODE_TEMPLATE.get(value) || '');
          }}
          style={{ width: 100, margin: '8px 0 0 8px' }}
          options={[
            { value: 'java', label: 'Java' },
            { value: 'cpp', label: 'C++' },
            { value: 'go', label: 'Golang' },
          ]}
        />

        <Divider style={{ margin: '8px 0 0 0' }} />
      </div>

      <div style={{ flexGrow: 1, marginBottom: 2 }}>
        <MonacoEditor
          height={coderHeight}
          options={options}
          language={language}
          value={code}
          onChange={setCode}
        />
      </div>
    </>
  );
};

export default Editor;
