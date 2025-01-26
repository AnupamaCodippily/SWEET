import {  useState } from 'react'
import QuestionForm from './components/QuestionForm'
import React from 'react'
import { useIpcRenderer } from './hooks/useIpcRenderer'
import { sendForTestingOpenAI } from './requests/send-for-testing'
import IPCChannel from './types/IPCChannel'
import { loadExamFromJsonString } from './utils/load-exam'

function App() {

  const [questions, setQuestions] = useState<string[]>([])
  const [questionIdx, setQuestionIdx] = useState<number>(0)
  const [answers, setAnswers] = useState<string[]>([])


  useIpcRenderer(IPCChannel.openExam , (data?: any ) => {
    if(data) loadExamFromJsonString(data)
  })


  // useEffect(() => {
  //   if (questionIdx + 1 < questions.length) {
  //     setQuestionIdx(questionIdx + 1)
  //   } else {
  //     questions.length && sendForTesting();
  //   }
  // }, [answers])



  async function sendForTesting() {
    await sendForTestingOpenAI(answers, questions)
  }

  function nextQuestion(new_answer: string) {
    setAnswers(answers => ([...answers, new_answer]))
  }




  if (questions?.length === 0) {
    return <>
      select an exam to start

    </>
  }

  return (
    <main>
      <QuestionForm question={questions[questionIdx]} next={nextQuestion} />
    </main>

  )
}

export default App
