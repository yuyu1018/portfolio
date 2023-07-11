const menuButton = document.getElementById('menu-button');
const nav = document.querySelector('nav');

menuButton.addEventListener('click', () => {
  nav.style.display = nav.style.display === 'none' ? 'block' : 'none';
  menuButton.classList.toggle('open');
});