import React, { useEffect, useState } from 'react'
import { MCQProblem } from '../models/Problem'

type QFormProps = {
    mcq: MCQProblem,
    next: Function
}

const MCQProblemForm: React.FC<QFormProps> = ({ mcq, next }) => {

    const [answer, setAnswer] = useState<Set<number>>(new Set());

    function handleNext(e: React.MouseEvent) {
        e.preventDefault();
        if (answer.size === 0) {
            alert("Please select an option");
            return;
        }
        const answerArray = Array.from(answer);
        setAnswer(new Set([]));
        next(answerArray);
    }

    return (
        <div>
            <h2>
                {mcq.statement}
            </h2>

            <div>
                {mcq.options.map((option, idx) => {
                    return (
                        <div className='mcq-option-container' key={idx} onClick={e => {
                            if (answer.has(idx)) {
                                setAnswer(answer => { answer.delete(idx); return new Set(answer) });
                            } else {
                                setAnswer(answer => { answer.add(idx); return new Set(answer); });
                            }
                        }}>
                            <span  >
                                {answer.has(idx) ? "👉  " : ""}  {"(" + (idx + 1) + ") " + option}
                            </span>
                        </div>
                    )
                })}
            </div>

            <br />
            <button onClick={e => handleNext(e)}>
                Next
            </button>
        </div>
    )
}

export default MCQProblemForm