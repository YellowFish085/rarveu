'use strict';

import * as THREE from 'three';

import Log from '../utils/log';

import EventEmitter from '../classes/EventEmitter';

import Modules from './modules';

class SceneController extends EventEmitter {
	constructor() {
		super();

		this._modulesList    = Modules;
		this._modules        = [];
		
		this._currentScene   = null;

		this._loadingManager = null;

		this.initLoadingManager();
		this.init();
	}

	initLoadingManager() {
		this._loadingManager = new THREE.LoadingManager();

		this._loadingManager.onProgress = function(item, loaded, total) {
			Log.trace(item + '\nloaded: ' + loaded + '\ntotal: ' + total );
		};

		this._loadingManager.onLoad = function() {
			Log.trace('loadingManager ends');
		};
	}

	init() {
		this._modulesList.forEach(function(Module, index) {
			this._modules.push(new Module());
			this._modules[this._modules.length - 1].init(this._loadingManager);
		}.bind(this));

		this._modules.forEach(function(Scene, index) {
			Scene.load();
		}.bind(this))

		if (this._modulesList.length > 0) {
			this._currentScene = this._modules[0];
		}

		this.addEventListener();
	}

	addEventListener() {
		
	}

	update() {
		this._currentScene.update();
	}

	get currentScene() {
		return this._currentScene;
	}
}

export default SceneController;