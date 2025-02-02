import React, { useState } from 'react'
import { CodingProblem } from '../models/Problem'
import { Exam } from '../models/Exam'
import CodingProblemEditor from './CodingProblemEditor'

interface CodingProblemExamContainerProps {
    exam: Exam
}

const CodingProblemExamContainer: React.FC<CodingProblemExamContainerProps> = (
    {
        exam
    }
) => {

    const [problem, setProblem] = useState<CodingProblem>(exam.problems[0] as CodingProblem);

    if (exam?.type !== 'CODING_PROBLEM') return "ERROR"

  return (
    <div>
        <CodingProblemEditor problem={problem}/>
    </div>
  )
}

export default CodingProblemExamContainer