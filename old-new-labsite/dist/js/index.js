!function r(a,u,s){function l(t,e){if(!u[t]){if(!a[t]){var n="function"==typeof require&&require;if(!e&&n)return n(t,!0);if(d)return d(t,!0);var o=new Error("Cannot find module '"+t+"'");throw o.code="MODULE_NOT_FOUND",o}var i=u[t]={exports:{}};a[t][0].call(i.exports,function(e){return l(a[t][1][e]||e)},i,i.exports,r,a,u,s)}return u[t].exports}for(var d="function"==typeof require&&require,e=0;e<s.length;e++)l(s[e]);return l}({1:[function(e,t,n){"use strict";function i(e,t){for(var n=0;n<t.length;n++){var o=t[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var o=function(){function t(e){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,t),this.sliderOptions={container:e,items:1,lazyload:!0,mouseDrag:!0,nav:!1,controlsPosition:"bottom",controlsText:["←","→"],swipeAngle:!1,speed:400},this.init()}var e,n,o;return e=t,(n=[{key:"init",value:function(){this.slider=tns(this.sliderOptions),this.createIndexCounter(),this.addEvents()}},{key:"addEvents",value:function(){var e=this,t=this.slider.getInfo(),n=t.prevButton,o=t.nextButton;n.onclick=function(){return e.updateIndexCounter()},o.onclick=function(){return e.updateIndexCounter()}}},{key:"createIndexCounter",value:function(){var e=this.slider.getInfo(),t=e.controlsContainer,n=e.slideCount,o=e.displayIndex;this.divCounter=document.createElement("div"),this.divCounter.innerHTML="".concat(o,"/").concat(n),this.divCounter.setAttribute("class","tns-controls-counter"),t.appendChild(this.divCounter)}},{key:"updateIndexCounter",value:function(){var e=this.slider.getInfo(),t=e.displayIndex,n=e.slideCount,o="".concat(t<n?t+1:1,"/").concat(n);this.divCounter.innerHTML=o}}])&&i(e.prototype,n),o&&i(e,o),t}();n.default=o},{}],2:[function(e,t,n){"use strict";Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var o=function(){document.getElementsByTagName("main")[0].classList.remove("loading")};n.default=o},{}],3:[function(e,t,n){"use strict";Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var o=function(){document.getElementById("language-switch").addEventListener("click",function(e){e.preventDefault();var t=window.location.href,n=document.documentElement.lang,o="en"===n?"de":"en",i=t.replace(n,o);window.location.href=i})};n.default=o},{}],4:[function(e,t,n){"use strict";Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var o=function(){console.log("nav"),document.addEventListener("scroll",function(e){var t=window.pageYOffset,n=document.getElementById("navigation"),o=n.classList.contains("navigation--hasShadow");50<=t&&!o?n.classList.add("navigation--hasShadow"):t<50&&o&&n.classList.remove("navigation--hasShadow")})};n.default=o},{}],5:[function(e,t,n){"use strict";var o,i=s(e("./modules/handleOnload.js")),r=s(e("./modules/navigationHandler.js")),a=s(e("./modules/languageSwitch.js")),u=s(e("./modules/ImageSlider.js"));function s(e){return e&&e.__esModule?e:{default:e}}function l(e){return function(e){if(Array.isArray(e)){for(var t=0,n=new Array(e.length);t<e.length;t++)n[t]=e[t];return n}}(e)||function(e){if(Symbol.iterator in Object(e)||"[object Arguments]"===Object.prototype.toString.call(e))return Array.from(e)}(e)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance")}()}(0,i.default)(),(0,r.default)(),(0,a.default)(),o="image-slider",l(document.getElementsByClassName(o)).forEach(function(e){return new u.default(e)})},{"./modules/ImageSlider.js":1,"./modules/handleOnload.js":2,"./modules/languageSwitch.js":3,"./modules/navigationHandler.js":4}]},{},[5]);
//# sourceMappingURL=index.js.map