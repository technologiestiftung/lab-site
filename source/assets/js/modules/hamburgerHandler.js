const hamburgerHandler = () => {
    const hamburger = document.getElementById('navigation-icon');
    const overlay = document.getElementById('navigation-overlay');
    const body = document.querySelector('body')
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('is-active');
        overlay.classList.toggle('is-active');
        body.classList.toggle('no-scroll');
    })
}
export default hamburgerHandler;