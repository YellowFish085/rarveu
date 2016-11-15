'use strict';

import Log from '../../../utils/log';

class KeyboardEvents {
  constructor() {
    this.bind();
  }

  init() {
    this.addEventListener();
  }

  bind() {
    this.onKeyDown = this.onKeyDown.bind(this);
    this.onKeyUp   = this.onKeyUp.bind(this);
  }

  addEventListener() {
    window.addEventListener('keydown', this.onKeyDown);
    window.addEventListener('keyup', this.onKeyUp);
  }

  onKeyDown(e) {
    const key = e.keyCode;

    Log.trace(`${key} down`);
  }

  onKeyUp(e) {
    const key = e.keyCode;

    Log.trace(`${key} up`);
  }
}

export default KeyboardEvents;
