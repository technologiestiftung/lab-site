const navigationHandler = () => {
    document.addEventListener('scroll', event => {
        const { pageYOffset } = window;

        const navigationElement = document.getElementById('navigation');
        const hasShadow = navigationElement.classList.contains(
            'navigation--hasShadow'
        );

        if (pageYOffset >= 50 && !hasShadow) {
            navigationElement.classList.add('navigation--hasShadow');
        } else if (pageYOffset < 50 && hasShadow) {
            navigationElement.classList.remove('navigation--hasShadow');
        }
    });
};

export default navigationHandler;

