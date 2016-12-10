/**
 * Template for Scenes Modules
 * If you want to add a module to the Scenes, juste create a module in the 'modules' directory based on this template and add it to the modules list.
 * You can use the base class 'Event' which implement the EventListener module used to communicate with the WebGL app.
 */

'use strict';

import * as THREE from 'three';

class TemplateScenes {
  constructor() {
    // NEEDED, used to manage loading progress with or without the Three.js loading manager
    // true: not using three.js loading manager
    // false: using three.js loading manager
    this.syncLoading = false;

    this._scene      = null;
  }

  /**
   * Will be called when ScenesManager is initialized.
   * Init what's necessary here.
   * loadingManager is the three.js loading manager used to track assets loading
   */
  init(loadingManager) {
    this._scene = new THREE.Scene();
  }

  /**
   * Load datas
   */
  load() {

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

export default TemplateScenes;
