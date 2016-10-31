'use strict';

import Log from '../utils/log';

import Modules from './modules';

/**
 * Events Controller
 * Auto-load modules in 'modules.js' and initialize them
 */
class EventsController {
	constructor() {
		this._modulesList = Modules;
		this._modules     = [];

		this.initEvents();
	}

	initEvents() {
		this._modulesList.forEach(function(Module, index) {
			this._modules.push(new Module());
			this._modules[this._modules.length - 1].init();
		}.bind(this));
	}
}

export default EventsController;