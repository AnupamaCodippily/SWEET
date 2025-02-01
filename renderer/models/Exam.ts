import { IProblem } from "./Problem";

export type ExamType = 'MCQ' | 'ESSAY' | 'CODING' | 'MIXED';

export interface Exam {
    title: string
    topics: string[];
    description: string;
    type: ExamType;  // what kind of exam, mcq, coding, or mixed?
    timeLimitSeconds?: number;
    problems: IProblem[];
}