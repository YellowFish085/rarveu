'use strict';

import * as THREE from 'three';

import Log from '../utils/log';

import EventEmitter from '../classes/EventEmitter';

import Modules from './modules';

class SceneController extends EventEmitter {
	constructor() {
		super();

		this._scenesList    = Modules;
		this._scenes        = [];
		
		this._currentSceneIndex   = null;

		this._loadingManager = null;

		this.initLoadingManager();
		this.init();
	}

	initLoadingManager() {
		this._loadingManager = new THREE.LoadingManager();

		this._loadingManager.onProgress = function(item, loaded, total) {
			Log.trace(item + '\nloaded: ' + loaded + '\ntotal: ' + total );

			var percentage = parseInt((loaded*100) / total);
			this.eeEmit('loading-progress', percentage);
		}.bind(this);

		this._loadingManager.onLoad = function() {
			Log.trace('loadingManager ends');
			
			this.eeEmit('loading-end');
		}.bind(this);
	}

	init() {
		this._scenesList.forEach(function(Module, index) {
			this._scenes.push(new Module());
			this._scenes[this._scenes.length - 1].init(this._loadingManager);
		}.bind(this));

		this._scenes.forEach(function(Scene, index) {
			Scene.load();
		}.bind(this))

		if (this._scenesList.length > 0) {
			this._currentSceneIndex = 0;
			this.currentScene.activate();
		}

		this.eeEmit('scene-changed', this._currentSceneIndex);
		this.addEventListener();
	}

	addEventListener() {
		this.eeListen('scenes-next', function() {
			// Deactivate current scene
			this.currentScene.deactivate();

			this._currentSceneIndex += 1;
			if (this._currentSceneIndex >= this._scenes.length) {
				this._currentSceneIndex = 0;
			}

			// Activate new scene
			this.currentScene.activate();

			Log.trace('new scene ' + this._currentSceneIndex);

			this.eeEmit('scene-changed', this._currentSceneIndex);
		}.bind(this))
	}

	update() {
		this._scenes[this._currentSceneIndex].update();
	}

	get currentScene() {
		return this._scenes[this._currentSceneIndex];
	}
}

export default SceneController;