'use strict';

import * as THREE   from 'three';

import Log          from '../../utils/log';

import EventEmitter from '../../classes/EventEmitter';

import Modules      from './modules';

class SceneController extends EventEmitter {
  constructor() {
    super();

    this._scenesList        = Modules;
    this._scenes            = [];
    this._currentSceneIndex = null;
    this._loadingManager    = null;

    this.init();
  }

  init() {
    this.bind();

    this.initLoadingManager();
    this.initScenes();

    this.addEventListener();
  }

  bind() {
    this.onLoadProgress = this.onLoadProgress.bind(this);
    this.onLoadEnd      = this.onLoadEnd.bind(this);
  }

  /**
   * Initialize three.js LoadingManager
   */
  initLoadingManager() {
    this._loadingManager            = new THREE.LoadingManager();

    this._loadingManager.onProgress = this.onLoadProgress;
    this._loadingManager.onLoad     = this.onLoadEnd;
  }

  onLoadProgress(item, loaded, total) {
    const percentage = parseInt((loaded * 100) / total);
    this.eeEmit('loading-progress', percentage);
  }

  onLoadEnd() {
    this.eeEmit('loading-end');
  }

  /**
   * Initialize scenes
   */
  initScenes() {
    this._scenesList.forEach((Module, index) => {
      this._scenes.push(new Module());
      this._scenes[this._scenes.length - 1].init(this._loadingManager);
    });

    this._scenes.forEach((Scene, index) => {
      Scene.load();
    });

    if (this._scenesList.length > 0) {
      this._currentSceneIndex = 0;
      this.currentScene.activate();
    }

    this.eeEmit('scene-changed', this._currentSceneIndex);
  }

  /**
   * Add events listeners
   */
  addEventListener() {
    this.eeListen('scenes-next', () => {
      this.currentScene.deactivate();

      this._currentSceneIndex += 1;
      if (this._currentSceneIndex >= this._scenes.length) {
        this._currentSceneIndex = 0;
      }

      this.currentScene.activate();

      this.eeEmit('scene-changed', this._currentSceneIndex);
    });
  }

  /**
   * Update current scene
   */
  update() {
    this._scenes[this._currentSceneIndex].update();
  }

  /**
   * Get current three.js scene
   */
  get currentScene() {
    return this._scenes[this._currentSceneIndex];
  }
}

export default SceneController;
