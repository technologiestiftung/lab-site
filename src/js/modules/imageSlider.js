class ImageSlider {
    constructor(domElement) {
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
    init() {
        this.slider = tns(this.sliderOptions); // TODO: Import tns without script tag

        this.createIndexCounter();
        this.addEvents();
    }
    addEvents() {
        const { prevButton, nextButton } = this.slider.getInfo();
        prevButton.onclick = () => this.updateIndexCounter();
        nextButton.onclick = () => this.updateIndexCounter();
    }
    createIndexCounter() {
        console.log(this.slider.getInfo());
        const {
            controlsContainer,
            slideCount,
            displayIndex
        } = this.slider.getInfo();

        this.divCounter = document.createElement('div');
        this.divCounter.innerHTML = `${displayIndex}/${slideCount}`;
        this.divCounter.setAttribute('class', 'tns-controls-counter');

        controlsContainer.appendChild(this.divCounter);
    }
    updateIndexCounter() {
        setTimeout(() => {
            const { displayIndex, slideCount } = this.slider.getInfo();

            const currentCounter = `${displayIndex}/${slideCount}`;
            console.log(currentCounter);
            this.divCounter.innerHTML = currentCounter;
        }, 500);
    }
}

export default ImageSlider;
