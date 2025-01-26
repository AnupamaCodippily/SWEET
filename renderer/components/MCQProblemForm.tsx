import React, { useEffect, useState } from 'react'
import { MCQProblem } from '../models/Problem'

type QFormProps = {
    mcq: MCQProblem,
    next: Function
}

const MCQProblemForm: React.FC<QFormProps> = ({ mcq, next }) => {

    const [answer, setAnswer] = useState<Set<number>>(new Set())

    const isMultiSelect = mcq.answer.length > 1;
    const inputType = isMultiSelect ? "checkbox" : "radio";

    return (
        <div>
            <h2>
                {mcq.statement}
            </h2>

            <div>
                {mcq.options.map((option, idx) => {
                    return (
                        <div key={idx}>
                            <input type={inputType} id={option} name="answer" value={option} onChange={e => {
                                if (e.target.checked) {
                                    setAnswer(answer => answer.add(idx));
                                } else {
                                    setAnswer(answer => {
                                        answer.delete(idx);
                                        return answer;
                                    });
                                }
                            }} />
                            <label htmlFor={option}>{option}</label>
                        </div>
                    )
                })}
            </div>

            <br />
            <button onClick={_ => { next(Array.from(answer).sort()); }}>
                Next
            </button>
        </div>
    )
}

export default MCQProblemForm