import React, { useEffect, useState } from 'react'

type QFormProps = {
    question: string,
    next: Function
}

const QuestionForm: React.FC<QFormProps> = ({ question, next }) => {

    const [answer, setAnswer] = useState<string>("")

    useEffect(() => {
        setAnswer("")
    }, [question])

    return (
        <div>
            <h2>
                {question}
            </h2>
            <textarea cols={100} rows={20} value={answer} onChange={e => setAnswer(_ => e.target.value)} />
            <br />
            <button onClick={_ => { next(answer); }}>
                Next
            </button>
        </div>
    )
}

export default QuestionForm