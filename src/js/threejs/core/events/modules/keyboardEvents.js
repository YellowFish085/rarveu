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

    // Key shorcut for speechs

    // p
    if (key === 80) {
      this.eeEmit('speech-play', {
        x   : window.innerWidth / 2,
        y   : window.innerHeight / 2,
        type: 'play',
      });
    }

    // w
    if (key === 87) {
      this.eeEmit('speech-thunder', {
        x   : window.innerWidth / 2,
        y   : window.innerHeight / 2,
        type: 'thunder',
      });
    }

    // x
    if (key === 88) {
      this.eeEmit('speech-fire', {
        x   : window.innerWidth / 2,
        y   : window.innerHeight / 2,
        type: 'fire',
      });
    }

    // c
    if (key === 67) {
      this.eeEmit('speech-water', {
        x   : window.innerWidth / 2,
        y   : window.innerHeight / 2,
        type: 'water',
      });
    }

    // v
    if (key === 86) {
      this.eeEmit('speech-wind', {
        x   : window.innerWidth / 2,
        y   : window.innerHeight / 2,
        type: 'wind',
      });
    }

    // this.eeEmit(monTruc)
  }

  onKeyUp(e) {
    const key = e.keyCode;

    Log.trace(`${key} up`);
  }
}

export default KeyboardEvents;
