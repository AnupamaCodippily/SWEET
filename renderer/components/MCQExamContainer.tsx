import React, { useEffect, useState } from 'react'
import { Exam } from '../models/Exam'
import { MCQProblem } from '../models/Problem'
import MCQProblemForm from './MCQProblemForm'

type mcqReport = {
    score: number,
    percentage: string
    responses: string
}

function evaluateMCQExam(mcqs: MCQProblem[], answers: number[][]): mcqReport {
    let score = 0
    let responses = ""
    for (let i = 0; i < mcqs.length; i++) {
        if (mcqs[i].answer.sort().join(",") === answers[i]?.sort().join(",")) {
            score++
            responses += "Q" + (i + 1) + ": ✅\n"
        } else {
            responses += "Q" + (i + 1) + ": ❌\n"
        }
    }
    console.log("Score: ", score)
    const percentage = (score / mcqs.length) * 100
    return {
        score, percentage: percentage.toFixed(2) + "%", responses
    }
}

const MCQExamContainer: React.FC<Exam> = ({ problems, title }) => {
    const [answers, setAnswers] = useState<number[][]>([])
    const [questions, setQuestions] = useState<MCQProblem[]>(problems as MCQProblem[])
    const [questionIdx, setQuestionIdx] = useState<number>(0)

    const [examComplete, setExamComplete] = useState<boolean>(false)

    useEffect(() => {
        if (questionIdx + 1 >= questions.length) {
            setExamComplete(true);
        }
    }, [answers])

    function nextQuestion(new_answer: number[]) {
        console.log(new_answer)
        setAnswers(answers => ([...answers, new_answer]))
        setQuestionIdx(questionIdx + 1)
    }

    if (examComplete) {

        const report = evaluateMCQExam(questions, answers)

        return (
            <div className='exam-complete-report'>
                <h1>Exam Complete</h1>
                <h2>Score: {report.score}</h2>
                <h2>Percentage: {report.percentage}</h2>

                <h3>Details:</h3>
                <pre style={{ textAlign: "left", backgroundColor: "black", padding: "10px" }}>    
                    {report.responses}
                </pre>

                <br></br>
                <br></br>

                <button onClick={_ => {
                    setAnswers(_ => [])
                    setQuestionIdx(0)
                    setExamComplete(false)
                }}>
                    Restart Exam
                </button>

                <button onClick={_ => {}}>
                    Close
                </button>
            </div>
        )
    }

    return (
        <div>
            <h1 style={{textAlign:'center', position: 'absolute', top: 10 }}>Exam: {title}</h1>
            <MCQProblemForm mcq={questions[questionIdx]} next={nextQuestion} />
        </div>
    )
}

export default MCQExamContainer