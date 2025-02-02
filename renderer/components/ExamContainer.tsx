import React from 'react'
import { Exam, ExamType } from '../models/Exam'
import MCQExamContainer from './MCQExamContainer'
import CodingProblemExamContainer from './CodingProblemExamContainer'

function getExamComponentByType ( props: ExamContainerProps )  {
    switch (props.exam.type) {
        case 'MCQ': return <MCQExamContainer {...props} />
        case 'ESSAY': return "NOT IMPLEMENTED YET"
        case 'CODING_PROBLEM': return <CodingProblemExamContainer {...props} />
        case 'MIXED': return "NOT IMPLEMENTED YET"
        default: return "ERROR -INVALID EXAM TYPE IMPORTED"
    }
}

interface ExamContainerProps {
    closeExam: Function,
    exam: Exam
}

const ExamContainer: React.FC<ExamContainerProps> = (props) => {
  return (
    <React.Fragment> 
            <button className='close-exam-button' style={{ position: 'fixed', top: 20, right: 24 }} onClick={_ => props.closeExam()}> Close Exam </button>
            {
                getExamComponentByType(props)
            }
    </React.Fragment>
  )
}

export default ExamContainer