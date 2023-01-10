export default class Slide {
  constructor(wrapper, slide) {
    this.wrapper = document.querySelector(wrapper);
    this.slide = document.querySelector(slide);
    this.position = {
      finalPosition: 0,
      startX: 0,
      movement: 0,
    }
  }

  bindEvents() {
    this.onStart = this.onStart.bind(this);
    this.onMove = this.onMove.bind(this);
    this.onEnd = this.onEnd.bind(this);
  }

  updatePosition(clientX) {
    this.position.movement = (this.position.startX - clientX) * 1.6;
    return this.position.finalPosition - this.position.movement;
  }

  moveSlide(distX) {
    this.position.movePosition = distX;
    this.slide.style.transform = `translate3d(${distX}px, 0, 0)`;
  }

  onStart(e) {
    e.preventDefault();
    this.position.startX = e.clientX;
    this.wrapper.addEventListener('mouseover', this.onMove);
  }

  onMove(e) {
    const finalPosition = this.updatePosition(e.clientX);
    this.moveSlide(finalPosition);
  }

  onEnd(e) {
    this.wrapper.removeEventListener('mouseover', this.onMove);
    this.position.finalPosition = this.position.movePosition;
  }

  addSlideEvents() {
    this.wrapper.addEventListener('mousedown', this.onStart);
    this.wrapper.addEventListener('mouseup', this.onEnd);
  }

  Init() {
    this.bindEvents();
    this.addSlideEvents();
    return this;
  }
}