import handleOnload from './modules/handleOnload.js';
import ImageSlider from './modules/ImageSlider.js';

/**
 * Handle onload interactions
 */
handleOnload();

/**
 * Initialize image sliders by classname
 */
function createImageSliders(sliderClassName) {
    const imageSliders = document.getElementsByClassName(sliderClassName);
    [...imageSliders].forEach(slider => new ImageSlider(slider));
}
createImageSliders('image-slider');
