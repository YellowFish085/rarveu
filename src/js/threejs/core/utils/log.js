'use strict';

import CONFIG from '../config/config';

/**
 * Log
 */
class Log {
	constructor() {

	}

	static log(msg) {
		if (CONFIG.DEBUG) {
			console.log(msg);
		}
	}

	static trace(msg) {
		if (CONFIG.DEBUG) {
			console.trace(msg);
		}
	}
}

export default Log;