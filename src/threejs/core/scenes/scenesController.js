'use strict';

import * as THREE from 'three';

import Log from '../utils/log';

import EventEmitter from '../classes/EventEmitter';

import Modules from './modules';

class SceneController extends EventEmitter {
	constructor() {
		super();

		this._modulesList  = Modules;
		this._modules      = [];
		
		this._currentScene = null;

		this.init();
	}

	init() {
		this._modulesList.forEach(function(Module, index) {
			this._modules.push(new Module());
			this._modules[this._modules.length - 1].init();
		}.bind(this));

		if (this._modulesList.length > 0) {
			this._currentScene = this._modules[0];
		}

		this.addEventListener();
	}

	addEventListener() {
		
	}

	get currentScene() {
		return this._currentScene;
	}
}

export default SceneController;