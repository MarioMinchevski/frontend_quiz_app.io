import { introMenu, quiz, quizFinished, quizzesData } from "../app.js";
import { makeTopicBox } from "./makeTopicBox.js";
import { questionDesc, quizAnswersBoxUl, questionNum, progressBarInner, submitButton, errorMessage, userScore, quizFinishedScore, playAgainBtn } from "./globalVars.js";
import { handleAnswersAnimations } from "./animations.js";
export const quizTopic = document.querySelector('.selected-topic-and-icon');
let currentQuiz;
let currentQustionIdx = 0;
let isSubmitting = true;
let answer;
let answerButtonFinal;
let correctAnswers = 0;
export const makeQuiz = (quizType) => {
    currentQuiz = quizzesData.find(quiz => quiz.title.toLowerCase() === quizType.toLowerCase());
    if (!currentQuiz) {
        throw new Error('Quiz not found');
    }
    makeTopicBox(quizType, quizTopic);
    renderQuestions();
};
function renderQuestions() {
    if (!currentQuiz) {
        return;
    }
    if (questionDesc && quizAnswersBoxUl && questionNum) {
        let currentQuestion = currentQuiz.questions[currentQustionIdx];
        questionDesc.textContent = currentQuestion.question;
        questionNum.innerHTML = (currentQustionIdx + 1).toString();
        quizAnswersBoxUl.innerHTML = '';
        progressBarInner.style.width = `${((currentQustionIdx + 1) / currentQuiz.questions.length) * 100}%`;
        currentQuestion.options.forEach((option, idx) => {
            const li = document.createElement('li');
            const answerButton = document.createElement('button');
            answerButton.classList.add('quiz-answer');
            const answerOption = document.createElement('div');
            answerOption.classList.add('icon-box', 'answer-option');
            if (idx === 0) {
                answerOption.textContent = 'A';
            }
            else if (idx === 1) {
                answerOption.textContent = 'B';
            }
            else if (idx === 2) {
                answerOption.textContent = 'C';
            }
            else if (idx === 3) {
                answerOption.textContent = 'D';
            }
            const answerOptionText = document.createElement('span');
            answerOptionText.classList.add('answer-option-text');
            answerOptionText.textContent = option;
            answerButton.append(answerOption, answerOptionText);
            li.append(answerButton);
            quizAnswersBoxUl.append(li);
            answerButton.addEventListener('click', (ev) => {
                const selectedButton = ev.currentTarget;
                selectedButton === null || selectedButton === void 0 ? void 0 : selectedButton.classList.add('selected');
                const allButtons = quizAnswersBoxUl.querySelectorAll('.quiz-answer');
                allButtons.forEach(button => button.classList.remove('selected'));
                selectedButton.classList.add('selected');
                answer = selectedButton.childNodes[1].textContent;
                answerButtonFinal = selectedButton;
            });
        });
        submitButton.textContent = 'Submit Answer';
        submitButton.removeEventListener('click', handleSubmitOrNext);
        submitButton.addEventListener('click', handleSubmitOrNext);
        handleAnswersAnimations();
    }
}
function handleSubmitOrNext() {
    const currentQuestion = currentQuiz.questions[currentQustionIdx];
    if (isSubmitting) {
        if (!answer) {
            errorMessage.classList.add('visible');
            return;
        }
        const allButtons = quizAnswersBoxUl.querySelectorAll('.quiz-answer');
        allButtons.forEach(button => {
            const icon = button.querySelector('img');
            if (icon)
                icon.remove();
        });
        if (answer === currentQuestion.answer) {
            answerButtonFinal.classList.add('correct');
            const correctIcon = document.createElement('img');
            correctIcon.setAttribute('src', './assets/images/icon-correct.svg');
            correctIcon.setAttribute('alt', 'correct-icon');
            answerButtonFinal.appendChild(correctIcon);
            correctAnswers++;
        }
        else {
            answerButtonFinal.classList.add('incorrect');
            const incorrectIcon = document.createElement('img');
            incorrectIcon.setAttribute('src', './assets/images/icon-error.svg');
            incorrectIcon.setAttribute('alt', 'incorrect-icon');
            answerButtonFinal.appendChild(incorrectIcon);
            allButtons.forEach(button => {
                const buttonText = button.querySelector('.answer-option-text').textContent;
                if (buttonText === currentQuestion.answer) {
                    button.classList.add('correct');
                    const correctIcon = document.createElement('img');
                    correctIcon.setAttribute('src', './assets/images/icon-correct.svg');
                    correctIcon.setAttribute('alt', 'correct-icon');
                    button.appendChild(correctIcon);
                }
            });
        }
        allButtons.forEach(button => {
            button.setAttribute('disabled', 'true');
        });
        errorMessage.classList.remove('visible');
        submitButton.textContent = 'Next question';
        isSubmitting = false;
    }
    else {
        currentQustionIdx++;
        answer = '';
        if (currentQustionIdx < currentQuiz.questions.length) {
            renderQuestions();
            isSubmitting = true;
        }
        else {
            quiz === null || quiz === void 0 ? void 0 : quiz.classList.add('hidden');
            quizFinished === null || quizFinished === void 0 ? void 0 : quizFinished.classList.remove('hidden');
            userScore.textContent = correctAnswers.toString();
            makeTopicBox(currentQuiz.title, quizFinishedScore);
        }
    }
}
playAgainBtn.addEventListener('click', handlePlayAgain);
function handlePlayAgain() {
    currentQuiz = undefined;
    currentQustionIdx = 0;
    isSubmitting = true;
    answer = '';
    correctAnswers = 0;
    quizFinishedScore.innerHTML = '';
    quizTopic.innerHTML = '';
    quizFinished === null || quizFinished === void 0 ? void 0 : quizFinished.classList.add('hidden');
    quiz === null || quiz === void 0 ? void 0 : quiz.classList.add('hidden');
    introMenu === null || introMenu === void 0 ? void 0 : introMenu.classList.remove('hidden');
}
