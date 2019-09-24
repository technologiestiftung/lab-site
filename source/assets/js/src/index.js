
// import 'whatwg-fetch'; // needed for ie11 should be the first things
// import 'babel-polyfill'; // needed for ie11 should be the first things
// import handleOnload from './modules/handleOnload.js';
// import navigationHandler from './modules/navigationHandler.js';
// import hamburgerHandler from './modules/hamburgerHandler.js';
// import languageSwitch from './modules/languageSwitch.js';
// import ImageSlider from './modules/ImageSlider.js';
// import featProjectsHandler from './modules/featProjectsHandler.js';
// import embedResize from './modules/embed-resize.js';
// // import Timeline from './modules/Timeline.js';
// // import {ie11Test} from './modules/ie-11-test.js';
// /**
//  * Initialize functions
//  */
// /**
//  * Initialize image sliders by classname
//  */

// // let projectTimeline;

// // function debounce(func, wait, immediate) {
// // 	var timeout;
// // 	return function() {
// // 		var context = this, args = arguments;
// // 		var later = function() {
// // 			timeout = null;
// // 			if (!immediate) { func.apply(context, args); }
// // 		};
// // 		var callNow = immediate && !timeout;
// // 		clearTimeout(timeout);
// // 		timeout = setTimeout(later, wait);
// // 		if (callNow) { func.apply(context, args); }
// // 	};
// // }

// // var embedResize = debounce(function() {

// //   const embeds = Array.from(document.querySelectorAll('.embed'));

// //   embeds.forEach((obj, currentIndex, listObj) => {
// //     const style = window.getComputedStyle(document.getElementById('navigation'), null);
// //     const padding_total = parseFloat(style.paddingLeft.replace('px', '')) * 2;
// //     const width = parseFloat(style.width);
// //     const styled_width = width - padding_total;
// //     const styled_height = (width / 16) * 9;

// //     obj.setAttribute('width', styled_width.toString());
// //     obj.setAttribute('height', styled_height.toString());
// //   });
// // }, 250);

// // function createTimeline(idTimelineDiv) {
// //   const div = document.getElementById(idTimelineDiv);
// //   if (div != null) {
// //     projectTimeline = new Timeline(div);
// //     projectTimeline.init();
// //   }
// // }

// function createImageSliders(sliderClassName) {
//   const imageSliders = document.getElementsByClassName(sliderClassName);
//   [...imageSliders].forEach(slider => new ImageSlider(slider));
// }

// // ie11Test();
// document.addEventListener('DOMContentLoaded', function() {
//   handleOnload();
//   navigationHandler();
//   hamburgerHandler();
//   languageSwitch();
//   featProjectsHandler();
//   // createTimeline('timeline');
//   createImageSliders('image-slider');
// });

// // window.addEventListener('resize', evt => {
// //   if (projectTimeline != undefined) {
// //     projectTimeline.onResize();
// //   }
// //   embedResize();
// // });

// embedResize();

import 'whatwg-fetch'; // needed for ie11 should be the first things
import 'babel-polyfill'; // needed for ie11 should be the first things
import handleOnload from './modules/handleOnload.js';
import navigationHandler from './modules/navigationHandler.js';
import hamburgerHandler from './modules/hamburgerHandler.js';
import languageSwitch from './modules/languageSwitch.js';
import ImageSlider from './modules/ImageSlider.js';
import featProjectsHandler from './modules/featProjectsHandler.js';
import embedResize from './modules/embed-resize.js';

// import Timeline from './modules/Timeline.js';
// import {ie11Test} from './modules/ie-11-test.js';
/**
 * Initialize functions
 */
/**
 * Initialize image sliders by classname
 */

// let projectTimeline;

// function debounce(func, wait, immediate) {
// 	var timeout;
// 	return function() {
// 		var context = this, args = arguments;
// 		var later = function() {
// 			timeout = null;
// 			if (!immediate) { func.apply(context, args); }
// 		};
// 		var callNow = immediate && !timeout;
// 		clearTimeout(timeout);
// 		timeout = setTimeout(later, wait);
// 		if (callNow) { func.apply(context, args); }
// 	};
// }

// var embedResize = debounce(function() {

//   const embeds = Array.from(document.querySelectorAll('.embed'));

//   embeds.forEach((obj, currentIndex, listObj) => {
//     const style = window.getComputedStyle(document.getElementById('navigation'), null);
//     const padding_total = parseFloat(style.paddingLeft.replace('px', '')) * 2;
//     const width = parseFloat(style.width);
//     const styled_width = width - padding_total;
//     const styled_height = (width / 16) * 9;

//     obj.setAttribute('width', styled_width.toString());
//     obj.setAttribute('height', styled_height.toString());
//   });
// }, 250);

// function createTimeline(idTimelineDiv) {
//   const div = document.getElementById(idTimelineDiv);
//   if (div != null) {
//     projectTimeline = new Timeline(div);
//     projectTimeline.init();
//   }
// }

function createImageSliders(sliderClassName) {
  const imageSliders = document.getElementsByClassName(sliderClassName);
  [...imageSliders].forEach(slider => new ImageSlider(slider));
}

// ie11Test();
document.addEventListener('DOMContentLoaded', function() {
  handleOnload();
  navigationHandler();
  hamburgerHandler();
  languageSwitch();
  featProjectsHandler();
  // createTimeline('timeline');
  createImageSliders('image-slider');
  toggleFeaturedClass();
});

window.addEventListener('resize', evt => {
  // if (projectTimeline != undefined) {
  //   projectTimeline.onResize();
  // }
  embedResize();
});

embedResize();

function toggleFeaturedClass() {
  const featured_list = document.querySelectorAll('.featured-list__project-image');

  setTimeout(() => {
    for (let index = 0; index < 4; index++) {
      const element = featured_list[index];

      if (element != undefined) {
        element.classList.remove('hidden');
      }

    }
  }, 150)

  setTimeout(() => {
    for (let index = 0; index < 4; index++) {
      const element = featured_list[index];

      if (element != undefined) {
        element.classList.add('translate');
      }

    }
  }, 50)

}