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
    let movetype;
    if (e.type === 'mousedown') {
      e.preventDefault();
      this.position.startX = e.clientX;
      movetype = 'mousemove';
    } else {
      this.position.startX = e.changedTouches[0].clientX;
      movetype = 'touchmove';
    }
    this.wrapper.addEventListener(movetype, this.onMove);
  }

  onMove(e) {
    const pointerPosition = (e.type === 'mousemove') ? e.clientX : e.changedTouches[0].clientX;
    const finalPosition = this.updatePosition(pointerPosition);
    this.moveSlide(finalPosition);
  }

  onEnd(e) {
    const movetype = (e.type === 'mouseup') ? 'mousemove' : 'touchmove';
    this.wrapper.removeEventListener(movetype, this.onMove);
    this.position.finalPosition = this.position.movePosition;
  }

  addSlideEvents() {
    this.wrapper.addEventListener('mousedown', this.onStart);
    this.wrapper.addEventListener('touchstart', this.onStart);
    this.wrapper.addEventListener('mouseup', this.onEnd);
    this.wrapper.addEventListener('touchend', this.onEnd);
  }

  Init() {
    this.bindEvents();
    this.addSlideEvents();
    return this;
  }
}