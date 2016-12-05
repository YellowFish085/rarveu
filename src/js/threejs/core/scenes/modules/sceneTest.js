'use strict';

import * as THREE   from 'three';

import EventEmitter from '../../../classes/EventEmitter';

class SceneTest extends EventEmitter {
  constructor() {
    super();

    this.syncLoading    = false;

    this._scene         = null;
    this._loader        = null;

    this._animationClip = null;
    this._mixer         = null;
    this._clock         = null;
  }

  /**
   * Will be called when ScenesManager is initialized.
   * Init what's necessary here.
   */
  init(loadingManager) {
    this.bind();

    this._clock  = new THREE.Clock();
    this._scene  = new THREE.Scene();
    this._loader = new THREE.ObjectLoader(loadingManager);
  }

  bind() {
    this.emitScenesNextEvent = this.emitScenesNextEvent.bind(this);
  }

  addEventListener() {
    document.addEventListener('click', this.emitScenesNextEvent);
  }

  removeEventListener() {
    document.removeEventListener('click', this.emitScenesNextEvent);
  }

  emitScenesNextEvent(e) {
    e.preventDefault();
    e.stopPropagation();

    this.eeEmit('scenes-next');
  }

  load() {
    this._loader.load('assets/threejs/models/test.json', (loadedScene) => {
      this._animationClip = loadedScene.animations[0];
      this._scene         = loadedScene;
      this._scene.fog     = new THREE.Fog(0xffffff, 2000, 10000);

      this._mixer         = new THREE.AnimationMixer(this._scene);
      this._mixer.clipAction(this._animationClip).play();
    });
  }

  update() {
    const delta = 0.75 * this._clock.getDelta();
    if (this._mixer) {
      // console.log( "updating mixer by " + delta );
      this._mixer.update(delta);
    }
  }

  activate() {
    this.addEventListener();
  }

  deactivate() {
    this.removeEventListener();
  }

  get scene() {
    return this._scene;
  }
}

export default SceneTest;
