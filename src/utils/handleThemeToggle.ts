import { body, iconMoon, iconSun, themeToggleButton } from "./globalVars.js"

export const handleThemeToggle = () => {
    themeToggleButton.classList.toggle('dark')

    body.classList.toggle('dark')
    const isDark = body.classList.contains('dark')

    if (isDark) {
        iconSun.src = './assets/images/icon-sun-light.svg'
        iconMoon.src = './assets/images/icon-moon-light.svg'
    } else {
        iconSun.src = './assets/images/icon-sun-dark.svg'
        iconMoon.src = './assets/images/icon-moon-dark.svg'
    }
}

