/* eslint-disable camelcase */
function debounce(func, wait, immediate) {
  var timeout;
  return function() {
    var context = this;
    var args = arguments;
    var later = function() {
      timeout = null;
      if (!immediate) {
        func.apply(context, args);
      }
    };
    var callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) {
      func.apply(context, args);
    }
  };
}

var embedResize = debounce(function() {

  const embeds = Array.from(document.querySelectorAll('.embed'));

  embeds.forEach((obj, currentIndex, listObj) => {
    const style = window.getComputedStyle(document.getElementById('navigation'), null);
    // tslint:disable-next-line: variable-name
    const padding_total = parseFloat(style.paddingLeft.replace('px', '')) * 2;
    const width = parseFloat(style.width);
    // tslint:disable-next-line: variable-name
    const styled_width = width - padding_total;
    // tslint:disable-next-line: variable-name
    const styled_height = (width / 16) * 9;

    obj.setAttribute('width', styled_width.toString());
    obj.setAttribute('height', styled_height.toString());
  });
}, 250);

export default embedResize;

