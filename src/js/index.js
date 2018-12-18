import handleOnload from './modules/handleOnload.js';
import languageSwitch from './modules/languageSwitch.js';
import ImageSlider from './modules/ImageSlider.js';

/**
 * Initialize functions
 */
handleOnload();
languageSwitch();

/**
 * Initialize image sliders by classname
 */
function createImageSliders(sliderClassName) {
    const imageSliders = document.getElementsByClassName(sliderClassName);
    [...imageSliders].forEach(slider => new ImageSlider(slider));
}
createImageSliders('image-slider');
