'use strict';

import * as THREE   from 'three';

import Player       from '../../models/Player';
import Sky          from '../../models/Sky';
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
    this.createLights();
    this.createObjects();
  }

  createLights() {
    this._objects.lights = {};

    // A hemisphere light is a gradient colored light;
    // the first parameter is the sky color, the second parameter is the ground color,
    // the third parameter is the intensity of the light
    const hemisphereLight = new THREE.HemisphereLight(0xaaaaaa, 0x000000, 0.9);

    // A directional light shines from a specific direction.
    // It acts like the sun, that means that all the rays produced are parallel.
    const shadowLight = new THREE.DirectionalLight(0xffffff, 0.9);

    // Set the direction of the light
    shadowLight.position.set(150, 350, 350);

    // Allow shadow casting
    shadowLight.castShadow = true;

    // define the visible area of the projected shadow
    shadowLight.shadow.camera.left   = -400;
    shadowLight.shadow.camera.right  = 400;
    shadowLight.shadow.camera.top    = 400;
    shadowLight.shadow.camera.bottom = -400;
    shadowLight.shadow.camera.near   = 1;
    shadowLight.shadow.camera.far    = 1000;

    // define the resolution of the shadow; the higher the better,
    // but also the more expensive and less performant
    shadowLight.shadow.mapSize.width  = 2048;
    shadowLight.shadow.mapSize.height = 2048;

    // an ambient light modifies the global color of a scene and makes the shadows softer
    const ambientLight = new THREE.AmbientLight(0x48B66F, 0.5);

    // to activate the lights, just add them to the scene
    this._objects.lights.hemisphereLight = hemisphereLight;
    this._objects.lights.shadowLight     = shadowLight;
    this._objects.lights.ambientLight    = ambientLight;

    this._scene.add(this._objects.lights.hemisphereLight);
    this._scene.add(this._objects.lights.shadowLight);
    this._scene.add(this._objects.lights.ambientLight);
  }

  createObjects() {
    const sky = new Sky();

    const floor = new Floor(250, 10, 500);
    floor._mesh.position.x = 0;
    floor._mesh.position.y = 0;
    floor._mesh.position.z = 0;

    const player = new Player();
    player._mesh.position.x = 0;
    player._mesh.position.y = 10;
    player._mesh.position.z = 200;

    this._scene.add(sky.mesh);
    this._scene.add(floor.mesh);
    this._scene.add(player.mesh);

    this._objects.sky = sky;

    this.debugAxis(100);
  }

  debugAxis(axisLength) {
    // Shorten the vertex function
    function v(x, y, z) {
      return new THREE.Vector3(x, y, z);
    }

    // Create axis (point1, point2, colour)
    function createAxis(p1, p2, color) {
      const lineGeometry = new THREE.Geometry();
      const lineMat      = new THREE.LineBasicMaterial({
        color,
      });

      lineGeometry.vertices.push(p1, p2);
      const line = new THREE.Line(lineGeometry, lineMat);

      return line;
    }

    this._scene.add(createAxis(v(0, 0, 0), v(axisLength, 0, 0), 0xFF0000));
    this._scene.add(createAxis(v(0, 0, 0), v(0, axisLength, 0), 0x00FF00));
    this._scene.add(createAxis(v(0, 0, 0), v(0, 0, axisLength), 0x0000FF));
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
    this._objects.sky.update();
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
