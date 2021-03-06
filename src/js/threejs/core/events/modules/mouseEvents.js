'use strict';

import EventEmitter from '../../../classes/EventEmitter';

class MouseEvents extends EventEmitter {
  constructor() {
    super();

    this.bind();
  }

  init() {
    this.addEventListener();
  }

  bind() {
    this.onMouseDown = this.onMouseDown.bind(this);
    this.onMouseUp   = this.onMouseUp.bind(this);
  }

  addEventListener() {
    const canvas = document.getElementById('main');

    document.addEventListener('mousedown', this.onMouseDown);
    document.addEventListener('mouseup', this.onMouseUp);
    canvas.addEventListener('mouseup', this.onMouseUp);
    document.addEventListener('touchstart', this.onMouseUp);
    canvas.addEventListener('touchstart', this.onMouseUp);
  }

  onMouseDown(e) {
    e.stopPropagation();
  }

  onMouseUp(e) {
    e.stopPropagation();

    this.eeEmit('mouseclick', {
      x   : e.clientX,
      y   : e.clientY,
      type: 'click',
    });

    this.eeEmit('startRecording');
  }
}

export default MouseEvents;
