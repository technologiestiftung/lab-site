const languageSwitch = () => {
  const languageSwitchElement = document.querySelectorAll('#language-switch');
  const switchers = [...languageSwitchElement];
  switchers.forEach((ele) => {

    ele.addEventListener('click', event => {
      if (event.preventDefault === undefined) {
        event.returnValue = false;
      } else {
        event.preventDefault();
      }
      const {pathname, origin} = window.location;
      if (pathname === '/') {
        window.location.assign(`${origin}/en`);
        // window.location.href = `${origin}/en`;
        return;
      }
      const segments = pathname.split('/');
      const filteredSegments = segments.map((val) => {
        if (val === 'de') {
          return 'en';
        } else if (val === 'en') {
          return 'de';
        } else {
          return val;
        }
      });
      const patchedUrl = `${origin}${filteredSegments.join('/')}`;
      window.location.assign(patchedUrl);
      // window.location.href = patchedUrl;

    });

  });
};

export default languageSwitch;
