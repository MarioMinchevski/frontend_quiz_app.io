export const makeTopicBox = (topic) => {
    const topicBox = document.createElement('div');
    topicBox.classList.add('icon-box', topic.toLowerCase());
    const topicImg = document.createElement('img');
    topicImg.setAttribute('alt', 'topic-icon');
    const topicText = document.createElement('span');
    topicText.classList.add('currentTopic');
    topicText.textContent =
        topic.charAt(0).toUpperCase() + topic.slice(1).toLowerCase();
    topicBox.append(topicImg);
    quizTopic.append(topicBox, topicText);
    switch (topic.toLowerCase()) {
        case 'accessibility':
            topicImg.src = './assets/images/icon-accessibility.svg';
            break;
        case 'html':
            topicImg.src = './assets/images/icon-html.svg';
            break;
        case 'css':
            topicImg.src = './assets/images/icon-css.svg';
            break;
        case 'javascript':
            topicImg.src = './assets/images/icon-javascript.svg';
            break;
    }
};
