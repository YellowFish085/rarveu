'use strict';

import * as THREE   from 'three';

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

    this.initScenes();

    this.addEventListener();
  }

  bind() {
    this.onLoadProgress = this.onLoadProgress.bind(this);
    this.onLoadEnd      = this.onLoadEnd.bind(this);
    this.sceneDisplayed = this.sceneDisplayed.bind(this);
  }

  onLoadProgress() {
    this._totalLoaded += 1;
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

    this.eeEmit('loading-scenes-end');
  }

  /**
   * Initialize scenes
   */
  initScenes() {
    this._scenesList.forEach((Module, index) => {
      this._scenes.push(new Module());
      this._scenes[this._scenes.length - 1].init();
    });

    this._scenes.forEach((Scene, index) => {
      Scene.load();
      this.onLoadProgress();
    });

    this.onLoadEnd();
  }

  /**
   * Add events listeners
   */
  addEventListener() {
    this.eeListen('scene-displayed', this.sceneDisplayed);
  }

  sceneDisplayed() {
    this._scenes[this._currentSceneIndex].sceneDisplayed();
  }

  nextScene() {
    this._scenes[this._currentSceneIndex].deactivate();

    this._currentSceneIndex += 1;
    
    if (this._currentSceneIndex >= this._scenes.length) {
      this._currentSceneIndex = 0;
      this.eeEmit('game-end');
    }
    else {
      this._scenes[this._currentSceneIndex].activate();
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
