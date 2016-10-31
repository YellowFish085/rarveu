'use strict';

import * as THREE from 'three';

import Log from '../utils/log';

import EventEmitter from '../classes/EventEmitter';

import Modules from './modules';

class SceneManager extends EventEmitter {
	constructor() {
		super();

		this._modulesList = Modules;
		this._modules     = [];
	}

	init() {
		this._modulesList.forEach(function(Module, index) {
			this._modules.push(new Module());
			this._modules[this._modules.length - 1].init();
		}.bind(this));
	}
}

export default SceneManager;