console.log('image slider');

var slider = tns({
    container: '.slider',
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

console.log(slider);
