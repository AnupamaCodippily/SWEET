export async function sendForTestingOpenAI(answers: string[], questions: string[]) {
    const response = await fetch('http://localhost:3000/exams/1/results', {
        body: JSON.stringify({
            applicantName: "Anupama C",
            questions,
            answers
        }),
        method: "post",
        mode: "cors",
        headers: {
            "Content-type": "application/json"
        }
    })

    const result = await response.json()

    return result;
}