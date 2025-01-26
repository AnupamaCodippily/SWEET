import React, { useEffect, useState } from 'react'
import { Exam } from '../models/Exam'
import { MCQProblem } from '../models/Problem'
import MCQProblemForm from './MCQProblemForm'

function evaluateMCQExam(mcqs: MCQProblem[], answers: number[][]) {
    let score = 0
    for (let i = 0; i < mcqs.length; i++) {
        if (mcqs[i].answer.sort().join(",") === answers[i]?.sort().join(",")) {
            score++
        }
    }
    console.log("Score: ", score)
    return score
}

const MCQExamContainer: React.FC<Exam> = ({ problems, title }) => {
    const [answers, setAnswers] = useState<number[][]>([])
    const [questions, setQuestions] = useState<MCQProblem[]>(problems as MCQProblem[])
    const [questionIdx, setQuestionIdx] = useState<number>(0)

    const [examComplete, setExamComplete] = useState<boolean>(false)

    useEffect(() => {
      if (questionIdx + 1 < questions.length) {
        setQuestionIdx(questionIdx + 1)
      } else {
        setExamComplete(true);
      }
    }, [answers])

    function nextQuestion(new_answer: number[]) {
        setAnswers(answers => ([...answers, new_answer]))
    }

    if (examComplete) {
        return (
            <div>
                <h1>Exam Complete</h1>
                <h2>Score: {evaluateMCQExam(questions, answers)}</h2>
            </div>
        )
    }

    return (
        <div>
            <h1>Exam: { title }</h1>
            <MCQProblemForm mcq={questions[questionIdx]} next={nextQuestion}/>
        </div>
    )
}

export default MCQExamContainer