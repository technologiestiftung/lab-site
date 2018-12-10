import Test from './modules/Test.js';
import ImageSlider from './modules/ImageSlider.js';

new Test();

/**
 * Initialize image sliders by classname
 */
function createImageSliders(sliderClassName) {
    const imageSliders = document.getElementsByClassName(sliderClassName);
    [...imageSliders].forEach(slider => new ImageSlider(slider));
}
createImageSliders('image-slider');
