'use strict';

import ExtendedEventEmitter from '../extendedEventEmitter';

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
	eeEmit(e) {
		this._ee.emit(e);
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
	 * Remove an event
	 * @param {string} e - Event name
	 * @param {function} func - Callback.
	 */
	eeRemove(e, func) {
		this._ee.remove(e, func);
	}
}

export default EventEmitter;