'use strict';

import CONFIG from '../core/config';

/**
 * Log
 */
class Log {
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
