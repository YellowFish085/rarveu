'use strict';

import * as THREE   from 'three';

import CONFIG       from '../../config';

import Player       from '../../models/Player';
import Sky          from '../../models/Sky';
import Floor        from '../../models/Floor';
import GateStart    from '../../models/GateStart';
import GatePattern  from '../../models/GatePattern';

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

    if (CONFIG.DEBUG) {
      if (!window.THREE) {
        window.THREE = THREE;
      }
      window.scene = this._scene;
    }
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
    hemisphereLight.name = 'hemisphereLight';

    // A directional light shines from a specific direction.
    // It acts like the sun, that means that all the rays produced are parallel.
    const shadowLight = new THREE.DirectionalLight(0xffffff, 0.9);
    shadowLight.name = 'shadowLight';

    // Set the direction of the light
    shadowLight.position.set(-150, 350, 350);

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
    ambientLight.name = 'ambientLight';

    // to activate the lights, just add them to the scene
    this._objects.lights.hemisphereLight = hemisphereLight;
    this._objects.lights.shadowLight     = shadowLight;
    this._objects.lights.ambientLight    = ambientLight;

    this._scene.add(this._objects.lights.hemisphereLight);
    this._scene.add(this._objects.lights.shadowLight);
    this._scene.add(this._objects.lights.ambientLight);
  }

  createObjects() {
    this.createObjectFloor();
    this.createObjectPlayer();
    this.createObjectGates();

    this.debugAxis(100);
  }

  createObjectFloor() {
    const floor = new THREE.Mesh();
    floor.name = 'floor';

    const floor1 = new Floor(250, 10, 240);
    floor1._mesh.position.x = 0;
    floor1._mesh.position.y = -5;
    floor1._mesh.position.z = -130;

    const floor2 = new Floor(250, 10, 240);
    floor2._mesh.position.x = 0;
    floor2._mesh.position.y = -5;
    floor2._mesh.position.z = 130;

    const floor3 = new Floor(100, 10, 20);
    floor3._mesh.position.x = -75;
    floor3._mesh.position.y = -5;
    floor3._mesh.position.z = 0;

    const floor4 = new Floor(100, 10, 20);
    floor4._mesh.position.x = 75;
    floor4._mesh.position.y = -5;
    floor4._mesh.position.z = 0;

    floor.add(floor1.mesh);
    floor.add(floor2.mesh);
    floor.add(floor3.mesh);
    floor.add(floor4.mesh);

    this._scene.add(floor);
  }

  createObjectPlayer() {
    const player = new Player();
    player._mesh.position.x = 0;
    player._mesh.position.y = 47;
    player._mesh.position.z = 200;

    this._scene.add(player.mesh);
  }

  createObjectGates() {
    const gate1 = new THREE.Mesh();
    gate1.recieveShadow = true;
    gate1.castShadow    = true;

    const gateStart1 = new GateStart();
    gateStart1._mesh.position.x = -122;
    gateStart1._mesh.position.y = 10;
    gateStart1._mesh.position.z = 0;

    const gatePattern1 = new GatePattern();
    gatePattern1._mesh.position.x = -98;
    gatePattern1._mesh.position.y = 10;
    gatePattern1._mesh.position.z = -6;
    gatePattern1._mesh.rotation.y = 0.3;

    const gatePattern2 = new GatePattern();
    gatePattern2._mesh.position.x = -76;
    gatePattern2._mesh.position.y = 10;
    gatePattern2._mesh.position.z = 0;
    gatePattern2._mesh.rotation.y = -0.3;

    const gatePattern3 = new GatePattern();
    gatePattern3._mesh.position.x = -55;
    gatePattern3._mesh.position.y = 10;
    gatePattern3._mesh.position.z = -6;
    gatePattern3._mesh.rotation.y = 0.3;

    const gatePattern4 = new GatePattern();
    gatePattern4._mesh.position.x = -32;
    gatePattern4._mesh.position.y = 10;
    gatePattern4._mesh.position.z = 0;
    gatePattern4._mesh.rotation.y = -0.3;

    gate1.add(gateStart1.mesh);
    gate1.add(gatePattern1.mesh);
    gate1.add(gatePattern2.mesh);
    gate1.add(gatePattern3.mesh);
    gate1.add(gatePattern4.mesh);

    this._scene.add(gate1);

    const gate2 = new THREE.Mesh();
    gate2.recieveShadow = true;
    gate2.castShadow    = true;

    const gateStart2 = new GateStart();
    gateStart2._mesh.position.x = 32;
    gateStart2._mesh.position.y = 10;
    gateStart2._mesh.position.z = 0;

    const gatePattern5 = new GatePattern();
    gatePattern5._mesh.position.x = 55;
    gatePattern5._mesh.position.y = 10;
    gatePattern5._mesh.position.z = -6;
    gatePattern5._mesh.rotation.y = 0.3;

    const gatePattern6 = new GatePattern();
    gatePattern6._mesh.position.x = 76;
    gatePattern6._mesh.position.y = 10;
    gatePattern6._mesh.position.z = 0;
    gatePattern6._mesh.rotation.y = -0.3;

    const gatePattern7 = new GatePattern();
    gatePattern7._mesh.position.x = 98;
    gatePattern7._mesh.position.y = 10;
    gatePattern7._mesh.position.z = -6;
    gatePattern7._mesh.rotation.y = 0.3;

    const gatePattern8 = new GatePattern();
    gatePattern8._mesh.position.x = 122;
    gatePattern8._mesh.position.y = 10;
    gatePattern8._mesh.position.z = 0;
    gatePattern8._mesh.rotation.y = -0.3;

    gate2.add(gateStart2.mesh);
    gate2.add(gatePattern5.mesh);
    gate2.add(gatePattern6.mesh);
    gate2.add(gatePattern7.mesh);
    gate2.add(gatePattern8.mesh);

    this._scene.add(gate2);
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

    const axisX = createAxis(v(0, 0, 0), v(axisLength, 0, 0), 0xFF0000);
    axisX.material.depthTest = false;
    const axisY = createAxis(v(0, 0, 0), v(0, axisLength, 0), 0x00FF00);
    axisY.material.depthTest = false;
    const axisZ = createAxis(v(0, 0, 0), v(0, 0, axisLength), 0x0000FF);
    axisZ.material.depthTest = false;

    this._scene.add(axisX);
    this._scene.add(axisY);
    this._scene.add(axisZ);
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
    // this._objects.sky.update();
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
