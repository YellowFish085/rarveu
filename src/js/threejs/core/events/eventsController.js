'use strict';

import Modules from './modules';

/**
 * Events Controller
 * Auto-load modules in 'modules.js' and initialize them
 */
class EventsController {
  constructor() {
    this._modulesList = Modules;
    this._modules     = [];

    this.init();
  }

  init() {
    this._modulesList.forEach((Module, index) => {
      this._modules.push(new Module());
      this._modules[this._modules.length - 1].init();
    });
  }
}

export default EventsController;
