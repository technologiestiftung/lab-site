const languageSwitch = () => {
    console.log('language switch');
    const languageSwitchElement = document.getElementById('language-switch');
    languageSwitchElement.addEventListener('click', event => {
        event.preventDefault();

        const currentLocation = window.location; // TODO: Test window.location in IE <= 11
        const { href } = currentLocation;
        const currentLang = document.documentElement.lang;
        const destinationLanguage = currentLang === 'en' ? 'de' : 'en';

        const destinationUrl = href.replace(currentLang, destinationLanguage);
        window.location.href = destinationUrl;
    });
};

export default languageSwitch;
