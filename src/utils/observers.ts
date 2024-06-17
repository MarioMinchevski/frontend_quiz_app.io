import { animateIntroMenu, animateQuiz, animateQuizFinished } from "./animations.js";

export const observeElements = (introMenu: Element, quiz: Element, quizFinished: Element) => {

    const introMenuObserver = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
                if (!introMenu.classList.contains('hidden')) {
                    animateIntroMenu()
                }
            }
        })
    })

    introMenuObserver.observe(introMenu, {
        attributes: true
    })

    const quizObserver = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
                if (!quiz.classList.contains('hidden')) {
                    animateQuiz()
                }
            }
        })
    })

    quizObserver.observe(quiz, {
        attributes: true
    })


    const quizFinishedObserver = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
                if (!quizFinished.classList.contains('hidden')) {
                    animateQuizFinished()
                }
            }
        })
    })

    quizFinishedObserver.observe(quizFinished, {
        attributes: true
    })
}
