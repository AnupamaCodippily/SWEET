export enum ProblemDifficulty {
    NOOB = 0,
    EASY = 1,
    MEDIUM = 2,
    HARD = 3
} 

export type ProblemType = 'MCQ' | 'ESSAY' | 'CODING_PROBLEM' | 'CODING_TAKEHOME' | 'SHORT_ANSWER';	

export interface IProblem {
    topics: string[];
    statement: string;
    difficulty: ProblemDifficulty;
    type?: ProblemType;
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

    answer?: string;
    topics: string[];
    statement: string;
    difficulty: ProblemDifficulty;
    type: ProblemType = 'ESSAY';
    
    constructor(topics: string[], statement: string, answer?: string, difficulty?: ProblemDifficulty) {
        this.statement = statement;
        this.topics = topics;
        this.answer = answer ?? '';
        this.difficulty = difficulty ?? ProblemDifficulty.EASY;
    }

}


export type CodingProblemTestCase = {
    input: string, 
    expected: string,
};

export type CodingProblemCodeBoilerplate =   {
    "language": ProgrammingLanguage,
    "code": string,
    "hidden_code": string
}

export type CodeSolution = {
    [language in ProgrammingLanguage]?: {
        code: string;
    };
};

// Sample for the above type
// const x : CodeSolution = {
//     'python3' : { code: '' },
//     'Java': { code: '' }
// }

export type ProgrammingLanguage = 'python3' | 'Java' | 'JavaScript' | 'TypeScript' | 'Rust';
export type TestCaseMatchType = 'EXACT_STRING_MATCH' | 'ALL_NUMBERS_ANY_ORDER' | 'ALL_STRINGS_ANY_ORDER' | 'ALL_NUMBERS_EXACT_ORDER';
// UNIMPLEMENTED - TODO
// Needs to have a function (one language is enough for now) to check new/ custom test cases
export class CodingProblem implements IProblem{

    testCases: CodingProblemTestCase[] = [];
    topics: string[];
    title: string;
    statement: string;
    difficulty: ProblemDifficulty;
    type: ProblemType = 'CODING_PROBLEM';
    solutions: CodeSolution;
    testCaseMatchType: TestCaseMatchType;
    boilerplate: CodingProblemCodeBoilerplate[]
    runtimeLimitMS: number = 10000;
    
    constructor(
        title: string, 
        topics: string[], 
        statement: string, 
        solutions: CodeSolution, 
        boilerplate: CodingProblemCodeBoilerplate[],
        difficulty?: ProblemDifficulty, 
        testcaseMatchType?: TestCaseMatchType
    ) {
        this.topics = topics;
        this.title = title;
        this.statement = statement;
        this.difficulty = difficulty ?? ProblemDifficulty.EASY;
        this.solutions = solutions;
        this.testCaseMatchType = testcaseMatchType ?? 'EXACT_STRING_MATCH'
        this.boilerplate = boilerplate;
    }

}


// TODO - SQL Problems
// TODO - CSS Problems - Create an exact replica of a webpage/ component + time limit