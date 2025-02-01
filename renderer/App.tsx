import { useState } from 'react'
import React from 'react'
import { useIpcRenderer } from './hooks/useIpcRenderer'
import IPCChannel from './types/IPCChannel'
import { loadExamFromJsonString } from './utils/load-exam'
import { Exam, ExamType } from './models/Exam'
import MCQExamContainer from './components/MCQExamContainer'

function App() {

  const [exam, setExam] = useState<Exam | null>(null)

  useIpcRenderer(IPCChannel.openExam, (data?: any) => {
    if (data) {
      const exam: Exam = loadExamFromJsonString(data);

      setExam(exam);
    }
  })

  if (!exam) {
    return <>
      <h2 style={{ textAlign: 'center', width: '100%', position: 'fixed'}}>File &gt; Open Exam</h2>
    </>
  }

  return (
    <main>
      {
        (exam?.type === 'MCQ' ) && <MCQExamContainer exam={exam} closeExam={() => setExam(_ => null)} />
      }
    </main>
  )
}

export default App
