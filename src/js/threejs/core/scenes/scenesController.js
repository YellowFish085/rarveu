'use strict';

import * as THREE   from 'three';

import Log          from '../../utils/log';

import EventEmitter from '../../classes/EventEmitter';

import Modules      from './modules';

class SceneController extends EventEmitter {
  constructor() {
    super();

    this._totalLoaded       = 0;
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
    this._totalLoaded += 1;

    const percentage = parseInt((this._totalLoaded * 100) / this._scenes.length);
    this.eeEmit('loading-progress', percentage);
  }

  onLoadEnd() {
    if (this._scenesList.length > 0) {
      this._currentSceneIndex = 0;
      this.currentScene.activate();
    }

    this.eeEmit('scene-changed', {
      currentSceneId: this._currentSceneIndex,
      scenes        : this._scenes,
      firstCall     : true,
    });

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

      if (Scene.syncLoading) {
        this.onLoadProgress(Scene, this._totalLoaded, this._scenes.length);
      }
    });

    if (this._totalLoaded === this._scenes.length) {
      this.onLoadEnd();
    }
  }

  /**
   * Add events listeners
   */
  addEventListener() {

  }

  nextScene() {
    this._currentSceneIndex += 1;
    
    if (this._currentSceneIndex >= this._scenes.length) {
      this._currentSceneIndex = 0;
      this.eeEmit('game-end');
    }
    else {
      this.eeEmit('scene-changed', {
        currentSceneId: this._currentSceneIndex,
        scenes        : this._scenes,
        firstCall     : false,
      });
    }
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
