
export function toggleSidebar() {
    const container = document.querySelector('.container');
    container.classList.toggle('collapsed');
    handleSidebarArrows();
}

export function handleSidebarArrows() {
    const openArrow = document.querySelector('.open-arrow');
    const closeArrow = document.querySelector('.close-arrow');
    const container = document.querySelector('.container');

    if (container.classList.contains('collapsed')) {
        openArrow.style.display = 'block';
        closeArrow.style.display = 'none';
    } else {
        openArrow.style.display = 'none';
        closeArrow.style.display = 'block';
    }
}

