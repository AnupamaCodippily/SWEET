import { IProblem } from "./Problem";

export interface Exam {
    title: string
    topics: string[];
    description: string;
    problems: IProblem[];
}