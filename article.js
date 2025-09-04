const menuToggle = document.getElementById('menu-toggle');
const lien = document.getElementById('lien');

menuToggle.addEventListener('click', () => {
    lien.classList.toggle('active');
    menuToggle.classList.toggle('active');
});