'use strict';

import Log          from '../../../utils/log';

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
    var threeContainer = document.getElementById('main');

    threeContainer.addEventListener('mousemove', this.onMouseMove);
    threeContainer.addEventListener('mousedown', this.onMouseDown);
    threeContainer.addEventListener('mouseup', this.onMouseUp);
  }

  onMouseMove(e) {

  }

  onMouseDown(e) {
    e.stopPropagation();

    Log.trace(`mouseDown, btn ${e.button}`);
  }

  onMouseUp(e) {
    e.stopPropagation();

    Log.trace(`mouseUp, btn ${e.button}`);
  }
}

export default MouseEvents;
