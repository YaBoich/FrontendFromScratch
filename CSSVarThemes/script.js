
let themeContainer;

// cache the themeContainer variable on DOM content loaded.
document.addEventListener("DOMContentLoaded", () => {
    themeContainer = document.querySelector('.theme-container');
});

function switchTheme(themeNum) {
    if (!themeContainer) {
        console.error("themeContainer variable not defined. Cannot switch theme.");
        return;
    }

    // Use a regular expression to match classes starting with "theme" followed by a number
    themeContainer.classList.forEach(className => {
        if (/^theme\d+$/.test(className)) {
            themeContainer.classList.remove(className);
        }
    });
    themeContainer.classList += " theme"+themeNum;
}
