'use strict';

import ExtendedEventEmitter from './extendedEventEmitter';

/**
 * Default Event class with an ExtendedEventEmitter
 * Can be used anywhere
 */
class EventEmitter {
  constructor() {
    this._ee = ExtendedEventEmitter;
  }

  /**
   * Emit an event
   * @param {string} e - Event name
   */
  eeEmit(e, params) {
    this._ee.emit(e, params);
  }

  /**
   * Listen to an event
   * @param {string} e - Event name
   * @param {function} func - Callback. Use .bind(this) if you want to access datas from the caller
   */
  eeListen(e, func) {
    this._ee.on(e, func);
  }

  /**
   * Listen to an event once. When event emited, the listener will be removed
   * @param {string} e - Event name
   * @param {function} func - Callback. Use .bind(this) if you want to access datas from the caller
   */
  eeOnce(e, func) {
    this._ee.once(e, func);
  }

  /**
   * Remove an event
   * @param {string} e - Event name
   * @param {function} func - Callback.
   */
  eeRemove(e, func) {
    this._ee.remove(e, func);
  }

  eeRemoveAllListeners() {
    console.log(this._ee);
    this._ee.removeAllListeners();
    console.log(this._ee);
  }
}

export default EventEmitter;
