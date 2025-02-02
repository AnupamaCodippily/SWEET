import { IProblem, ProblemType } from "./Problem";

export type ExamType = ProblemType | 'MIXED';

export interface Exam {
    title: string
    topics: string[];
    description: string;
    type: ExamType;  // what kind of exam, mcq, coding, or mixed?
    timeLimitSeconds?: number;
    problems: IProblem[];
}