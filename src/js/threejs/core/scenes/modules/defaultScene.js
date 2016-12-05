'use strict';

import * as THREE   from 'three';

import EventEmitter from '../../../classes/EventEmitter';

class DefaultScene extends EventEmitter {
  constructor() {
    super();
    
    this._scene  = null;
    this._loader = null;
  }

  /**
   * Will be called when ScenesManager is initialized.
   * Init what's necessary here.
   * loadingManager is the three.js loading manager used to track assets loading
   */
  init(loadingManager) {
    this.bind();

    this._scene  = new THREE.Scene();
    this._loader = new THREE.ObjectLoader(loadingManager);
  }

  bind() {

  }

  /**
   * Load datas
   */
  load() {
    this._loader.load('assets/threejs/models/magikarp/BR_Magikarp.json', (loadedScene) => {
      this._scene         = loadedScene;
      this._scene.fog     = new THREE.Fog(0xffffff, 2000, 10000);
    });
  }

  /**
   * Update scene each frame
   */
  update() {

  }

  /**
   * Actions to do before this scene is renderer
   */
  activate() {

  }

  /**
   * Actions to do before scene is removed
   */
  deactivate() {

  }

  /**
   * Retun three.js scene. Used for three.js renderer
   */
  get scene() {
    return this._scene;
  }
}

export default DefaultScene;
