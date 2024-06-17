import { Quiz } from "../types";

export const makeQuestionTypesButtons = (quizzes: Quiz[]) => {
    const container = document.querySelector('.intro-menu__quiz-subjects-box')

    if (!container) {
        throw new Error('Cannot find parent container')
    }

    quizzes.forEach(quiz => {
        const quizSubject = document.createElement('button')
        quizSubject.classList.add('quiz-subject')
        quizSubject.id = `${quiz.title.toLowerCase()}`

        const iconBox = document.createElement('div')
        iconBox.classList.add('icon-box', `${quiz.title.toLowerCase()}`)

        const img = document.createElement('img')
        img.src = `./assets/images/icon-${quiz.title.toLowerCase()}.svg`
        img.setAttribute('alt', 'subject-icon')

        const h2Title = document.createElement('h2')
        h2Title.innerHTML = `${quiz.title}`

        iconBox.append(img)
        quizSubject.append(iconBox, h2Title)
        container.append(quizSubject)
    })
}
