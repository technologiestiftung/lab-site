const handleOnload = () => {
  const mainElement = document.getElementsByTagName('main');
  mainElement[0].classList.remove('loading');
};

export default handleOnload;
