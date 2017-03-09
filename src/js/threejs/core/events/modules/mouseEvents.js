'use strict';

import Log          from '../../../utils/log';

import * as CONFIG  from '../../config';

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
    this.onMouseMove = this.onMouseMove.bind(this);
    this.onMouseDown = this.onMouseDown.bind(this);
    this.onMouseUp   = this.onMouseUp.bind(this);
  }

  addEventListener() {
    document.addEventListener('mousemove', this.onMouseMove);
    document.addEventListener('mousedown', this.onMouseDown);
    document.addEventListener('mouseup', this.onMouseUp);
    document.addEventListener('touchstart', this.onMouseUp);
  }

  onMouseMove(e) {

  }

  onMouseDown(e) {
    e.stopPropagation();
  }

  onMouseUp(e) {
    console.log(e);

    e.stopPropagation();

    this.eeEmit('mouseclick', {
      x   : e.clientX,
      y   : e.clientY,
      type: 'click',
    });

    this.eeEmit('startRecording');

    // const appWrapper = document.getElementById('app-wrapper');
    // appWrapper.addEventListener('mouseup touchstart', this.onMouseUp);
  }
}

export default MouseEvents;
