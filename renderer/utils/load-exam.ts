import { Exam } from "../models/Exam";

export function loadExamFromJsonString(data: string): Exam {
    const exam = JSON.parse(data) as Exam;
    return exam;
}