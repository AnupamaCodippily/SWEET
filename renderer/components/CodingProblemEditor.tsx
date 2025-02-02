import React, { useState } from 'react'
import { CodingProblem, ProgrammingLanguage } from '../models/Problem'
import MonacoEditor from "@monaco-editor/react";

interface CodingProblemEditorProps {
  problem: CodingProblem
}


const CodingProblemEditor: React.FC<CodingProblemEditorProps> = ({ problem }) => {

  const [programmingLanguage, setProgrammingLanguage] = useState<ProgrammingLanguage>(problem.boilerplate[0].language)
  const [code, setCode] = useState<string>(problem.boilerplate[0].code);
  const [output, setOutput] = useState("");
  const [testCases, setTestCases] = useState("Input: [1,2,3] Expected Output: 6");

  const runCode = () => {
    try {
      // Simulated execution
      setOutput("Output: 6");
    } catch (error: any) {
      setOutput("Error: " + error.message);
    }
  };

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '10px', padding: '10px', height: '100vh' }}>
      {/* Problem Statement */}
      <div style={{ border: '1px solid #ccc', padding: '10px' }}>
        <h2 style={{ fontSize: '20px', fontWeight: 'bold' }}>{problem.title}</h2>
        <p style={{ marginTop: '10px', fontSize: '14px' }}>{problem.statement}</p>
      </div>

      {/* Code Editor */}
      <div style={{ display: 'flex', flexDirection: 'column', border: '1px solid #ccc' }}>
        <div style={{ flex: '1', padding: '10px' }}>
          <MonacoEditor
            height="400px"
            defaultLanguage={programmingLanguage}
            value={code}
            theme='vs-dark'
            onChange={(value: string | undefined) => setCode(value || "")}
          />
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', padding: '10px' }}>
          <textarea
            style={{ width: '50%', padding: '5px', border: '1px solid #ccc', borderRadius: '5px' }}
            value={testCases}
            readOnly
          />
          <button onClick={runCode} style={{ marginLeft: '10px', padding: '5px 10px', border: '1px solid #ccc', backgroundColor: '#f0f0f0', cursor: 'pointer' }}>Run</button>
        </div>
      </div>

      {/* Console Output */}
      <div style={{ gridColumn: 'span 2', marginTop: '10px', padding: '10px', border: '1px solid #ccc' }}>
        <h2 style={{ fontSize: '16px', fontWeight: 'bold' }}>Console Output</h2>
        <pre style={{ marginTop: '10px', padding: '10px', backgroundColor: 'black', borderRadius: '5px', fontSize: '14px', color: 'lightgreen' }}>{output}</pre>
      </div>
    </div>
  );
};

export default CodingProblemEditor