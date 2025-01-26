import { useEffect, useState } from 'react'
import QuestionForm from './components/QuestionForm'
import React from 'react'
import { ipcRenderer } from 'electron'
import { sendForTestingOpenAI } from './requests/send-for-testing'

function App() {

  const [questions, setQuestions] = useState<string[]>([])
  const [questionIdx, setQuestionIdx] = useState<number>(0)
  const [answers, setAnswers] = useState<string[]>([])

  
  useEffect(() => {
    // Listen for the 'load-exam' event from ipcRenderer
    ipcRenderer.on('load-exam', (event, data) => {
      try {
        const parsedData = JSON.parse(data); // Parse the JSON data
        setQuestions(parsedData['questions']); // Update state with the loaded exam data
        setQuestionIdx(0);
        setAnswers([]);

      } catch (error) {
        alert('Error parsing exam data. Please try again.'); // Show an alert if there was an error parsing the data
        console.error('Error parsing exam data:', error);
      }
    });

    // Cleanup the listener when the component unmounts
    return () => {
      ipcRenderer.removeAllListeners('load-exam');
    };
  }, []); // Empty dependency array to run only once on mount




  useEffect(() => {
    if (questionIdx + 1 < questions.length) {
      setQuestionIdx(questionIdx + 1)
    } else {
      questions.length && sendForTesting();
    }
  }, [answers])



  async function sendForTesting() {
    await sendForTestingOpenAI(answers, questions)
  }

  function nextQuestion(new_answer: string) {
    setAnswers(answers => ([...answers, new_answer]))
  }




  if (!questions || questions?.length === 0) {
    return <>
      select a topic 😁
    </>
  }

  return (
    <main>
      <QuestionForm question={questions[questionIdx]} next={nextQuestion} />
    </main>

  )
}

export default App
