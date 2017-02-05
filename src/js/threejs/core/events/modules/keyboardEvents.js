'use strict';

import Log from '../../../utils/log';

import EventEmitter from '../../../classes/EventEmitter';

class KeyboardEvents extends EventEmitter {
  constructor() {
    super();

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

    // if S key is pressed
    if (key === 83) {
      this.eeEmit('stereoKey');
    }

    // t
    if (key === 84) {
      this.eeEmit('startRecording');
    }

    // this.eeEmit(monTruc)
  }

  onKeyUp(e) {
    const key = e.keyCode;

    Log.trace(`${key} up`);
  }
}

export default KeyboardEvents;
