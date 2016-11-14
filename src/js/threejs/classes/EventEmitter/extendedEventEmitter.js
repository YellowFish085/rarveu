'use strict';

import EventEmitter from 'events';

/**
 * Extended Events Emitter
 * Extends default Node.js Event Emitter
 */
class ExtendedEventEmitter extends EventEmitter {
	constructor() {
		super();
	}
}

export default (new ExtendedEventEmitter);