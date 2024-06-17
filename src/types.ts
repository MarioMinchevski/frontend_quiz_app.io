export interface QuizRoot {
    quizzes: Quiz[]
}

export interface Quiz {
    title: string
    icon: string
    questions: Question[]
}

export interface Question {
    question: string
    options: string[]
    answer: string
}
