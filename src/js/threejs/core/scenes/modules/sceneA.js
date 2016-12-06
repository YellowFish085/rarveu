'use strict';

import * as THREE   from 'three';

import Floor        from '../../models/Floor';

import EventEmitter from '../../../classes/EventEmitter';

class SceneA extends EventEmitter {
  constructor() {
    super();
    
    this.syncLoading = true;
    
    this._objects    = {};
    
    this._scene      = null;
    this._loader     = null;
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

    this.fillScene();
  }

  bind() {

  }

  fillScene() {
    this.createObjects();
  }

  createObjects() {
    this.debugAxis(100);
  }

  debugAxis(axisLength){
    //Shorten the vertex function
    function v(x,y,z){
      return new THREE.Vector3(x,y,z);
    }

    //Create axis (point1, point2, colour)
    function createAxis(p1, p2, color){
      let line;
      let lineGeometry = new THREE.Geometry();
      let lineMat      = new THREE.LineBasicMaterial({
        color: color,
      });

      lineGeometry.vertices.push(p1, p2);
      line = new THREE.Line(lineGeometry, lineMat);

      return line;
    }

    this._scene.add(createAxis(v(-axisLength, 0, 0), v(axisLength, 0, 0), 0xFF0000));
    this._scene.add(createAxis(v(0, -axisLength, 0), v(0, axisLength, 0), 0x00FF00));
    this._scene.add(createAxis(v(0, 0, -axisLength), v(0, 0, axisLength), 0x0000FF));
};

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

export default SceneA;
