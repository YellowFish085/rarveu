'use strict';

import { TimelineLite } from 'gsap';
import * as THREE   from 'three';

import CONFIG       from '../../config';

import Player       from '../../models/Player';
import Goal         from '../../models/Goal';
import Sky          from '../../models/Sky';
import Floor        from '../../models/Floor';
import GateStart    from '../../models/GateStart';
import GatePattern  from '../../models/GatePattern';
import Rock         from '../../models/Rock';

import EventEmitter from '../../../classes/EventEmitter';

class SceneA extends EventEmitter {
  constructor() {
    super();

    this._objects    = {};

    this._scene      = null;
  }

  /**
   * Will be called when ScenesManager is initialized.
   * Init what's necessary here.
   */
  init() {
    this.bind();

    this.addEventListener();

    this._objects.intersects = [];

    this._scene  = new THREE.Scene();

    this.fillScene();
  }

  bind() {
    this.endAnimation   = this.endAnimation.bind(this);
  }

  addEventListener() {
    
  }

  sceneDisplayed() {
    this.eeEmit('scene-speech-helper-wind');
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
    this.createObjectRock();

    const sky = new Sky();
    this._scene.add(sky.mesh);
    this._objects.sky = sky;

    const goal = new Goal();
    goal._mesh.position.x = 0;
    goal._mesh.position.y = 0;
    goal._mesh.position.z = -150;
    this._objects.goal = goal;
    this._scene.add(goal.mesh);

    if (CONFIG.DEBUG) {
      this.debugAxis(100);
    }
  }

  createObjectFloor() {
    const floor1 = new Floor(250, 50, 240);
    floor1._mesh.position.x = 0;
    floor1._mesh.position.y = -25;
    floor1._mesh.position.z = -145;

    const floor2 = new Floor(250, 50, 240);
    floor2._mesh.position.x = 0;
    floor2._mesh.position.y = -25;
    floor2._mesh.position.z = 145;

    const floor3 = new Floor(100, 50, 50);
    floor3._mesh.position.x = -75;
    floor3._mesh.position.y = -25;
    floor3._mesh.position.z = 0;

    const floor4 = new Floor(100, 50, 50);
    floor4._mesh.position.x = 75;
    floor4._mesh.position.y = -25;
    floor4._mesh.position.z = 0;

    const floorGeometry = new THREE.Geometry();
    floor1._mesh.updateMatrix();
    floorGeometry.merge(floor1.mesh.geometry, floor1.mesh.matrix);
    floor2._mesh.updateMatrix();
    floorGeometry.merge(floor2.mesh.geometry, floor2.mesh.matrix);
    floor3._mesh.updateMatrix();
    floorGeometry.merge(floor3.mesh.geometry, floor3.mesh.matrix);
    floor4._mesh.updateMatrix();
    floorGeometry.merge(floor4.mesh.geometry, floor4.mesh.matrix);

    const floor = new THREE.Mesh(floorGeometry, floor1.mat);
    floor.name          = 'floor';
    floor.receiveShadow = true;

    this._scene.add(floor);
  }

  createObjectPlayer() {
    const player = new Player();
    player._mesh.position.x = 0;
    player._mesh.position.y = 47;
    player._mesh.position.z = 200;

    this._objects.player = player;

    this._scene.add(player.mesh);
  }

  createObjectGates() {
    // Gate 1
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

    const gate1Geometry = new THREE.Geometry();
    gateStart1._mesh.updateMatrix();
    gate1Geometry.merge(gateStart1.mesh.geometry, gateStart1.mesh.matrix);
    gatePattern1._mesh.updateMatrix();
    gate1Geometry.merge(gatePattern1.mesh.geometry, gatePattern1.mesh.matrix);
    gatePattern2._mesh.updateMatrix();
    gate1Geometry.merge(gatePattern2.mesh.geometry, gatePattern2.mesh.matrix);
    gatePattern3._mesh.updateMatrix();
    gate1Geometry.merge(gatePattern3.mesh.geometry, gatePattern3.mesh.matrix);
    gatePattern4._mesh.updateMatrix();
    gate1Geometry.merge(gatePattern4.mesh.geometry, gatePattern4.mesh.matrix);

    const gate1 = new THREE.Mesh(gate1Geometry, gateStart1.mat);
    gate1.name          = 'Gate1';
    gate1.receiveShadow = true;
    gate1.castShadow    = true;

    this._scene.add(gate1);

    // Gate 2
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

    const gate2Geometry = new THREE.Geometry();
    gateStart2._mesh.updateMatrix();
    gate2Geometry.merge(gateStart2.mesh.geometry, gateStart2.mesh.matrix);
    gatePattern5._mesh.updateMatrix();
    gate2Geometry.merge(gatePattern5.mesh.geometry, gatePattern5.mesh.matrix);
    gatePattern6._mesh.updateMatrix();
    gate2Geometry.merge(gatePattern6.mesh.geometry, gatePattern6.mesh.matrix);
    gatePattern7._mesh.updateMatrix();
    gate2Geometry.merge(gatePattern7.mesh.geometry, gatePattern7.mesh.matrix);
    gatePattern8._mesh.updateMatrix();
    gate2Geometry.merge(gatePattern8.mesh.geometry, gatePattern8.mesh.matrix);

    const gate2 = new THREE.Mesh(gate2Geometry, gateStart2.mat);
    gate2.name          = 'Gate2';
    gate2.receiveShadow = true;
    gate2.castShadow    = true;

    this._scene.add(gate2);
  }

  createObjectRock() {
    const rock = new Rock(50, 50, 50);
    rock._mesh.position.x = 0;
    rock._mesh.position.y = 25;
    rock._mesh.position.z = -50;

    rock._mesh.interactId       = 'Rock1';
    rock._mesh.interactCallback = this.interactRock;
    rock._mesh.originalColor    = rock._mesh.material.color.getHex();
    rock._mesh.hoverColor       = 0xFFFF00;
    rock._mesh.state            = 'idle';

    this._objects.intersects.push(rock.mesh);
    this._scene.add(rock.mesh);
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
   * Reset interactables objects to their original color
   */
  resetInteracts() {
    let i;
    for (i = 0; i < this._objects.intersects.length; i++) {
      this._objects.intersects[i].material.color.setHex(this._objects.intersects[i].originalColor);
    }
  }

  /**
   * Hover color on interactable object
   */
  interactHover(obj) {
    if (obj.object.state === 'idle') {
      obj.object.material.color.setHex(obj.object.hoverColor);
    }
  }

  /**
   * Launch Interaction with Object
   */
  interact(obj, type) {
    if (obj.object.state !== 'idle') return; // Can only activate objects that are idle

    if ((obj.object.interactId === 'Rock1' && type === 'wind') || (CONFIG.DEBUG && obj.object.interactId === 'Rock1' && type === 'click')) {
      obj.object.state = 'activated';

      this.eeEmit('scene-speech-helper-close');
      this.eeEmit('play-random-action-sound');
      
      obj.object.interactCallback();

      this.endAnimation();
    }
  }

  interactRock() {
    this.material.color.set(0xff0000);

    const tl = new TimelineLite({
      onComplete: () => {
        this.state = 'disabled';
      },
    });

    tl.to(this.position, 1, { z: this.position.z + 50 })
      .to(this.position, 1, { y: this.position.y - 50 });

    tl.play();
  }

  endAnimation() {
    const tl = new TimelineLite({
      onComplete: () => {
        this.eeEmit('scene-completed');
      },
    });

    tl.delay(2) // Dirty, but cannot have a callback on interactRock, neither an eventemitter event
      .to(this._objects.player.mesh.position, 3, { ease: Expo.easeInOut, z: this._objects.player.mesh.position.z - 350 });
    tl.play();
  }

  /**
   * Update scene each frame
   */
  update() {
    this._objects.sky.update();
    this._objects.goal.update();
  }

  /**
   * Actions to do before this scene is renderer
   */
  activate() {
    if (CONFIG.DEBUG) {
      if (!window.THREE) {
        window.THREE = THREE;
      }
      window.scene = this._scene;
    }
  }

  /**
   * Actions to do before scene is removed
   */
  deactivate() {
    if (CONFIG.DEBUG) {
      window.scene = null;
    }
  }

  /**
   * Retun three.js scene. Used for three.js renderer
   */
  get scene() {
    return this._scene;
  }

  get objects() {
    return this._objects;
  }
}

export default SceneA;
