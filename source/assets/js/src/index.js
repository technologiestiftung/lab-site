//@ts-check

import "whatwg-fetch"; // needed for ie11 should be the first things
import "core-js/stable"; // needed for ie11 should be the first things
import handleOnload from "./modules/handleOnload.js";
import navigationHandler from "./modules/navigationHandler.js";
import hamburgerHandler from "./modules/hamburgerHandler.js";
import languageSwitch from "./modules/languageSwitch.js";
import ImageSlider from "./modules/ImageSlider.js";
import featProjectsHandler from "./modules/featProjectsHandler.js";
import embedResize from "./modules/embed-resize.js";
import initArchivalModal from "./modules/archivalModal.js";

function createImageSliders(sliderClassName) {
  const imageSliders = document.getElementsByClassName(sliderClassName);
  [...imageSliders].forEach((slider) => new ImageSlider(slider));
}

// ie11Test();
document.addEventListener("DOMContentLoaded", function () {
  handleOnload();
  navigationHandler();
  hamburgerHandler();
  languageSwitch();
  initArchivalModal();
  featProjectsHandler();
  // createTimeline('timeline');
  createImageSliders("image-slider");
  toggleFeaturedClass();
});

window.addEventListener("resize", (evt) => {
  // if (projectTimeline != undefined) {
  //   projectTimeline.onResize();
  // }
  embedResize();
});

embedResize();

function toggleFeaturedClass() {
  const featured_list = document.querySelectorAll(
    ".featured-list__project-image",
  );

  setTimeout(() => {
    for (let index = 0; index < 4; index++) {
      const element = featured_list[index];

      if (element != undefined) {
        element.classList.remove("hidden");
      }
    }
  }, 150);

  setTimeout(() => {
    for (let index = 0; index < 4; index++) {
      const element = featured_list[index];

      if (element != undefined) {
        element.classList.add("translate");
      }
    }
  }, 50);
}
