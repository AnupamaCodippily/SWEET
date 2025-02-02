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

type MCQExamContainerProps = {
    exam: Exam,
    closeExam: Function
}

const MCQExamContainer: React.FC<MCQExamContainerProps> = ({ exam: { problems, title }, closeExam }) => {

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

                <button onClick={_ => closeExam()}>
                    Close
                </button>
            </div>
        )
    }

    return (
        <div>
            <h2 style={{ textAlign: 'center', position: 'absolute', top: 10 }}>Exam: {title}</h2>

            <MCQProblemForm mcq={questions[questionIdx]} next={nextQuestion} />

            <div style={{ position: 'absolute', bottom: 0, right: 10 }}>
                <h3>Question {questionIdx + 1} of {questions.length}</h3>
            </div>
        </div>
    )
}

export default MCQExamContainer