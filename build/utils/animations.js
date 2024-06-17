const timelineOne = gsap.timeline({ defaults: { duration: 1, ease: "power2.out" } });
const timelineTwo = gsap.timeline({ defaults: { duration: 1, ease: "power2.out" } });
export const handleStaticAnimations = () => {
    gsap.from('.theme-toggle', { duration: 1, opacity: 0, x: "300%", ease: "power2.out" });
    timelineOne
        .from('.intro-menu__header-box h1', { opacity: 0, x: "-100%" })
        .from('.intro-menu__header-box p', { opacity: 0, x: "-100%" }, "-=0.5");
};
export const handleSubjectAnimations = () => {
    gsap.from('.quiz-subject', { duration: 1, x: "200%", ease: "power2.out", stagger: 0.5 });
};
export const handleAnswersAnimations = () => {
    timelineTwo
        .from('.quiz-answer', { x: "200%", ease: "power2.out", stagger: 0.5 })
        .from('.submit-anwser-btn', { duration: 1, x: "200%" }, "-=0.5");
};
export const handleTopicAnimation = () => {
    gsap.from('.icon-box', { duration: 1, opacity: 0, x: "-300%", ease: "power2.out" });
    gsap.from('.currentTopic', { duration: 1, opacity: 0, x: "-300%", ease: "power2.out" });
};
export const animateQuizFinished = () => {
    gsap.from('.quiz-finished-text-box', { duration: 1, opacity: 0, x: "-100%", ease: "power2.out" });
    gsap.from('.quiz-finished-score-wrapper', { duration: 1, opacity: 0, x: "100%", ease: "power2.out" });
};
export const animateIntroMenu = () => {
    handleStaticAnimations();
    handleSubjectAnimations();
};
export const animateQuiz = () => {
    timelineOne
        .from('.quiz-text-box p', { opacity: 0, x: "-100%" })
        .from('.question-desc', { opacity: 0, x: "-100%" }, "-=0.5")
        .from('.progress-bar', { opacity: 0, x: "-100%" }, "-=0.5");
};
