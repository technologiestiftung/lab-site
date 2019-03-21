import handleOnload from './modules/handleOnload.js';
import navigationHandler from './modules/navigationHandler.js';
import hamburgerHandler from './modules/hamburgerHandler.js';
import languageSwitch from './modules/languageSwitch.js';
import ImageSlider from './modules/ImageSlider.js';
import featProjectsHandler from './modules/featProjectsHandler.js';
import Timeline from './modules/Timeline.js';
/**
 * Initialize functions
 */
/**
 * Initialize image sliders by classname
 */

 let projectTimeline;

function createTimeline(idTimelineDiv) {
  const div = document.getElementById(idTimelineDiv);
  if (div != null) {
    projectTimeline = new Timeline(div);
    projectTimeline.init();
  }
}

function createImageSliders(sliderClassName) {
  const imageSliders = document.getElementsByClassName(sliderClassName);
  [...imageSliders].forEach(slider => new ImageSlider(slider));
}

document.addEventListener('DOMContentLoaded',function() {
  handleOnload();
  navigationHandler();
  hamburgerHandler();
  languageSwitch();
  featProjectsHandler();
  createTimeline('timeline');
  createImageSliders('image-slider');
});

window.addEventListener('resize', evt => {
  projectTimeline.onResize();
})
