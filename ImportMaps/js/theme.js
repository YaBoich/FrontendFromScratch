
import { removeTheme } from "utils"

let theme = "theme1"
let themeContainer;

// cache theme container
document.addEventListener("DOMContentLoaded", () => {
    themeContainer = document.querySelector('.container');
});

export function toggleTheme() {
    if (theme === "theme1") {
        theme = "theme2";
    } else {
        theme = "theme1";
    }
    setTheme(theme);
}

function setTheme(theme) {
    removeTheme(themeContainer);
    themeContainer.classList += " " + theme;
}
