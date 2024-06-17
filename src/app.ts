import { Quiz, QuizRoot } from "./types"
import { handleStaticAnimations, handleSubjectAnimations } from "./utils/animations.js"
import { themeToggleButton } from "./utils/globalVars.js"
import { handleThemeToggle } from "./utils/handleThemeToggle.js"
import { makeQuestionTypesButtons } from "./utils/makeQuestionTypesButtons.js"
import { makeQuiz } from "./utils/makeQuiz.js"
import { observeElements } from "./utils/observers.js"

export let quizzesData: Quiz[] = []

export const introMenu = document.querySelector('.intro-menu')!
export const quiz = document.querySelector('.quiz')!
export const quizFinished = document.querySelector('.quiz-finished')!

const getJsonData = async (): Promise<QuizRoot> => {
    try {
        const res = await fetch('../data/data.json')

        if (!res.ok) {
            throw new Error('Failed to fetch data')
        }

        const data: QuizRoot = await res.json()

        quizzesData = data.quizzes
        return data

    } catch (error) {
        console.error('Error fetching data:', error)
        throw error
    }
}

const initializeData = async () => {
    await getJsonData()
}

initializeData()
    .then(() => {
        makeQuestionTypesButtons(quizzesData)
        handleSubjectAnimations()
    })
    .then(() => {
        const quizTypeButtons = document.querySelectorAll('.quiz-subject')

        quizTypeButtons.forEach(button => button.addEventListener('click', (ev) => {
            const buttonId = (ev.currentTarget as HTMLButtonElement)?.id
            console.log('Button ID:', buttonId)
            introMenu?.classList.add('hidden')
            quiz?.classList.remove('hidden')

            makeQuiz(buttonId)
        }))
    })
    .catch(error => {
        console.error('Error initializing data:', error)
    })

themeToggleButton.addEventListener('click', handleThemeToggle)

handleStaticAnimations()
observeElements(introMenu, quiz, quizFinished)