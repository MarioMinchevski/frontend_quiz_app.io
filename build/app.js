var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { handleStaticAnimations, handleSubjectAnimations } from "./utils/animations.js";
import { themeToggleButton } from "./utils/globalVars.js";
import { handleThemeToggle } from "./utils/handleThemeToggle.js";
import { makeQuestionTypesButtons } from "./utils/makeQuestionTypesButtons.js";
import { makeQuiz } from "./utils/makeQuiz.js";
import { observeElements } from "./utils/observers.js";
export let quizzesData = [];
export const introMenu = document.querySelector('.intro-menu');
export const quiz = document.querySelector('.quiz');
export const quizFinished = document.querySelector('.quiz-finished');
const getJsonData = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const res = yield fetch('../data/data.json');
        if (!res.ok) {
            throw new Error('Failed to fetch data');
        }
        const data = yield res.json();
        quizzesData = data.quizzes;
        return data;
    }
    catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
});
const initializeData = () => __awaiter(void 0, void 0, void 0, function* () {
    yield getJsonData();
});
initializeData()
    .then(() => {
    makeQuestionTypesButtons(quizzesData);
    handleSubjectAnimations();
})
    .then(() => {
    const quizTypeButtons = document.querySelectorAll('.quiz-subject');
    quizTypeButtons.forEach(button => button.addEventListener('click', (ev) => {
        var _a;
        const buttonId = (_a = ev.currentTarget) === null || _a === void 0 ? void 0 : _a.id;
        console.log('Button ID:', buttonId);
        introMenu === null || introMenu === void 0 ? void 0 : introMenu.classList.add('hidden');
        quiz === null || quiz === void 0 ? void 0 : quiz.classList.remove('hidden');
        makeQuiz(buttonId);
    }));
})
    .catch(error => {
    console.error('Error initializing data:', error);
});
themeToggleButton.addEventListener('click', handleThemeToggle);
handleStaticAnimations();
observeElements(introMenu, quiz, quizFinished);
