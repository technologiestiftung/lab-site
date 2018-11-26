console.log('image slider');

var sliderImages = document.getElementsByClassName('slider');
console.log(sliderImages);

var slider = tns({
    container: '.project-slider',
    items: 1,
    lazyload: true,
    mouseDrag: true,
    nav: false,
    onInit: function() {
        console.log('init slider');
    },
    controlsPosition: 'bottom',
    controlsText: ['←', '→'],
    swipeAngle: false,
    speed: 400
});
