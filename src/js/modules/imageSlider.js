class ImageSlider {
    constructor(domElement) {
        this.sliderOptions = {
            container: domElement,
            items: 1,
            lazyload: true,
            mouseDrag: true,
            nav: false,
            onInit: function() {
                // console.log('init slider');
            },
            controlsPosition: 'bottom',
            controlsText: ['←', '→'],
            swipeAngle: false,
            speed: 400
        };

        this.init();
    }
    init() {
        this.slider = tns(this.sliderOptions);
    }
}

export default ImageSlider;
