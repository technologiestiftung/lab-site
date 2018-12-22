import handleOnload from './modules/handleOnload.js';
import navigationHandler from './modules/navigationHandler.js';
import languageSwitch from './modules/languageSwitch.js';
import ImageSlider from './modules/ImageSlider.js';

/**
 * Initialize functions
 */
handleOnload();
navigationHandler();
languageSwitch();

/**
 * Initialize image sliders by classname
 */
function createImageSliders(sliderClassName) {
    const imageSliders = document.getElementsByClassName(sliderClassName);
    [...imageSliders].forEach(slider => new ImageSlider(slider));
}
createImageSliders('image-slider');
