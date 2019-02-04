// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles

// eslint-disable-next-line no-global-assign
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  for (var i = 0; i < entry.length; i++) {
    newRequire(entry[i]);
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  return newRequire;
})({"modules/handleOnload.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var handleOnload = function handleOnload() {
  var mainElement = document.getElementsByTagName('main');
  mainElement[0].classList.remove('loading');
};

var _default = handleOnload;
exports.default = _default;
},{}],"modules/navigationHandler.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var navigationHandler = function navigationHandler() {
  console.log('nav');
  document.addEventListener('scroll', function (event) {
    var _window = window,
        pageYOffset = _window.pageYOffset;
    var navigationElement = document.getElementById('navigation');
    var hasShadow = navigationElement.classList.contains('navigation--hasShadow');

    if (pageYOffset >= 50 && !hasShadow) {
      navigationElement.classList.add('navigation--hasShadow');
    } else if (pageYOffset < 50 && hasShadow) {
      navigationElement.classList.remove('navigation--hasShadow');
    }
  });
};

var _default = navigationHandler;
exports.default = _default;
},{}],"modules/languageSwitch.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var languageSwitch = function languageSwitch() {
  var languageSwitchElement = document.getElementById('language-switch');
  languageSwitchElement.addEventListener('click', function (event) {
    event.preventDefault();
    var currentLocation = window.location; // TODO: Test window.location in IE <= 11

    var href = currentLocation.href;
    var currentLang = document.documentElement.lang;
    var destinationLanguage = currentLang === 'en' ? 'de' : 'en';
    var destinationUrl = href.replace(currentLang, destinationLanguage);
    window.location.href = destinationUrl;
  });
};

var _default = languageSwitch;
exports.default = _default;
},{}],"modules/ImageSlider.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var ImageSlider =
/*#__PURE__*/
function () {
  function ImageSlider(domElement) {
    _classCallCheck(this, ImageSlider);

    this.sliderOptions = {
      container: domElement,
      items: 1,
      lazyload: true,
      mouseDrag: true,
      nav: false,
      controlsPosition: 'bottom',
      controlsText: ['←', '→'],
      swipeAngle: false,
      speed: 400
    };
    this.init();
  }

  _createClass(ImageSlider, [{
    key: "init",
    value: function init() {
      this.slider = tns(this.sliderOptions); // TODO: Replace import of tns over script tag in html

      this.createIndexCounter();
      this.addEvents();
    }
  }, {
    key: "addEvents",
    value: function addEvents() {
      var _this = this;

      var _this$slider$getInfo = this.slider.getInfo(),
          prevButton = _this$slider$getInfo.prevButton,
          nextButton = _this$slider$getInfo.nextButton;

      prevButton.onclick = function () {
        return _this.updateIndexCounter();
      };

      nextButton.onclick = function () {
        return _this.updateIndexCounter();
      };
    }
  }, {
    key: "createIndexCounter",
    value: function createIndexCounter() {
      var _this$slider$getInfo2 = this.slider.getInfo(),
          controlsContainer = _this$slider$getInfo2.controlsContainer,
          slideCount = _this$slider$getInfo2.slideCount,
          displayIndex = _this$slider$getInfo2.displayIndex;

      this.divCounter = document.createElement('div');
      this.divCounter.innerHTML = "".concat(displayIndex, "/").concat(slideCount);
      this.divCounter.setAttribute('class', 'tns-controls-counter');
      controlsContainer.appendChild(this.divCounter);
    }
  }, {
    key: "updateIndexCounter",
    value: function updateIndexCounter() {
      var _this$slider$getInfo3 = this.slider.getInfo(),
          displayIndex = _this$slider$getInfo3.displayIndex,
          slideCount = _this$slider$getInfo3.slideCount;

      var nextCounterIndex = displayIndex < slideCount ? displayIndex + 1 : 1;
      var currentCounter = "".concat(nextCounterIndex, "/").concat(slideCount);
      this.divCounter.innerHTML = currentCounter;
    }
  }]);

  return ImageSlider;
}();

var _default = ImageSlider;
exports.default = _default;
},{}],"index.js":[function(require,module,exports) {
"use strict";

var _handleOnload = _interopRequireDefault(require("./modules/handleOnload.js"));

var _navigationHandler = _interopRequireDefault(require("./modules/navigationHandler.js"));

var _languageSwitch = _interopRequireDefault(require("./modules/languageSwitch.js"));

var _ImageSlider = _interopRequireDefault(require("./modules/ImageSlider.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

/**
 * Initialize functions
 */
(0, _handleOnload.default)();
(0, _navigationHandler.default)();
(0, _languageSwitch.default)();
/**
 * Initialize image sliders by classname
 */

function createImageSliders(sliderClassName) {
  var imageSliders = document.getElementsByClassName(sliderClassName);

  _toConsumableArray(imageSliders).forEach(function (slider) {
    return new _ImageSlider.default(slider);
  });
}

createImageSliders('image-slider');
},{"./modules/handleOnload.js":"modules/handleOnload.js","./modules/navigationHandler.js":"modules/navigationHandler.js","./modules/languageSwitch.js":"modules/languageSwitch.js","./modules/ImageSlider.js":"modules/ImageSlider.js"}],"../../node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "63779" + '/');

  ws.onmessage = function (event) {
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      console.clear();
      data.assets.forEach(function (asset) {
        hmrApply(global.parcelRequire, asset);
      });
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          hmrAccept(global.parcelRequire, asset.id);
        }
      });
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAccept(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAccept(bundle.parent, id);
  }

  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAccept(global.parcelRequire, id);
  });
}
},{}]},{},["../../node_modules/parcel-bundler/src/builtins/hmr-runtime.js","index.js"], null)
//# sourceMappingURL=/index.bundle.map