export enum ProblemDifficulty {
    EASY = 1,
    MEDIUM = 2,
    HARD = 3
} 


export type ProblemType = 'MCQ' | 'ESSAY' | 'CODING_PROBLEM' | 'CODING_TAKEHOME' | 'SHORT_ANSWER';	

export interface IProblem {
    topics: string[];
    statement: string;
    difficulty: ProblemDifficulty;
    type: ProblemType;
}


export class MCQProblem implements IProblem{

    options: string[];
    answer: number[];
    topics: string[];
    statement: string;
    difficulty: ProblemDifficulty;
    type: ProblemType = 'MCQ';
    
    constructor(topics: string[], statement: string, options: string[], answer: number[], difficulty?: ProblemDifficulty) {
        this.options = options;
        this.answer = answer;
        this.topics = topics;
        this.statement = statement;
        this.difficulty = difficulty ?? ProblemDifficulty.EASY;
    }

}

export class EssayProblem implements IProblem{

    answer: string;
    topics: string[];
    statement: string;
    difficulty: ProblemDifficulty;
    type: ProblemType = 'ESSAY';
    
    constructor(topics: string[], statement: string, answer: string, difficulty?: ProblemDifficulty) {
        this.answer = answer;
        this.topics = topics;
        this.statement = statement;
        this.difficulty = difficulty ?? ProblemDifficulty.EASY;
    }

}


export type CodingProblemTestCase = {
    input: string, 
    expected: string,
    exactStringMatch: boolean  // if true, the output must be exactly the same as expected, otherwise it can be a different sequence of characters
};

export type ProgrammingLanguage = 'Python' | 'Java' | 'JavaScript' | 'TypeScript';

// UNIMPLEMENTED - TODO
// Needs to have a function (one language is enough for now) to check new/ custom test cases
export class CodingProblem implements IProblem{

    test_cases: CodingProblemTestCase[] = [];
    topics: string[];
    statement: string;
    difficulty: ProblemDifficulty;
    type: ProblemType = 'CODING_PROBLEM';
    
    constructor(topics: string[], statement: string, difficulty?: ProblemDifficulty) {
        this.topics = topics;
        this.statement = statement;
        this.difficulty = difficulty ?? ProblemDifficulty.EASY;
    }

}


// TODO - SQL Problems
// TODO - CSS Problems - Create an exact replica of a webpage/ component + time limit