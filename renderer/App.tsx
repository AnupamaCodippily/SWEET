import { useState } from 'react'
import React from 'react'
import { useIpcRenderer } from './hooks/useIpcRenderer'
import IPCChannel from './types/IPCChannel'
import { loadExamFromJsonString } from './utils/load-exam'
import { Exam } from './models/Exam'
import MCQExamContainer from './components/MCQExamContainer'

function App() {

  const [exam, setExam] = useState<Exam | null>(null)

  useIpcRenderer(IPCChannel.openExam, (data?: any) => {
    if (data) {
      const exam: Exam = loadExamFromJsonString(data);

      setExam(exam);
    }
  })


  // async function sendForTesting() {
  //   await sendForTestingOpenAI(answers, questions)
  // }



  if (!exam) {
    return <>
      <h1>File &gt; Open Exam</h1>
    </>
  }

  return (
    <main>
      {
        (exam && exam.problems[0].type === 'MCQ') && <MCQExamContainer {...exam} />
      }
    </main>

  )
}

export default App
