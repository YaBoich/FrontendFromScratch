
/*
 * Function that removes any theme<number> class from the given element
 */
export function removeTheme(element) {
    element.classList.forEach(className => {
        if (/^theme\d+$/.test(className)) {
            element.classList.remove(className);
        }
    });
}
