
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

    // TODO: Replace import of tns over script tag in html
    // but why? It creates a larger bundle…
    // only useful if we use treeshaking
    this.slider = tns(this.sliderOptions);

    this.createIndexCounter();
    this.addEvents();
  }
  addEvents() {
    const { prevButton, nextButton } = this.slider.getInfo();
    prevButton.onclick = () => this.updateIndexCounter();
    nextButton.onclick = () => this.updateIndexCounter();
  }
  createIndexCounter() {
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
    const { displayIndex, slideCount } = this.slider.getInfo();

    const nextCounterIndex =
            displayIndex < slideCount ? displayIndex + 1 : 1;
    const currentCounter = `${nextCounterIndex}/${slideCount}`;
    this.divCounter.innerHTML = currentCounter;
  }
}

export default ImageSlider;
