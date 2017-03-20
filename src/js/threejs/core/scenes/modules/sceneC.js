'use strict';

import { TimelineLite } from 'gsap';
import * as THREE   from 'three';

import CONFIG       from '../../config';

import Player       from '../../models/Player';
import Goal         from '../../models/Goal';
import Sky          from '../../models/Sky';
import Floor        from '../../models/Floor';
import Water        from '../../models/Water';
import Plank        from '../../models/Plank';
import Rock        from '../../models/Rock';

import EventEmitter from '../../../classes/EventEmitter';

class SceneC extends EventEmitter {
  constructor() {
    super();

    this._objects    = {};

    this._scene      = null;
    this._step       = 0; // quick counter to check if level is won
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
    this.eeEmit('scene-speech-helper-windwater'); // like the legend of zelda : the wind water on gamecube
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
    this.createObjectWater();
    this.createObjectPlank();
    this.createObjectRock();

    const sky = new Sky();
    this._scene.add(sky.mesh);
    this._objects.sky = sky;

    const goal = new Goal();
    goal._mesh.position.x = -20;
    goal._mesh.position.y = 0;
    goal._mesh.position.z = -150;
    this._objects.goal = goal;
    this._scene.add(goal.mesh);

    if (CONFIG.DEBUG) {
      this.debugAxis(100);
    }
  }

  createObjectFloor() {
    const floor1 = new Floor(250, 100, 180);
    floor1._mesh.position.x = 0;
    floor1._mesh.position.y = -50;
    floor1._mesh.position.z = -145;

    const floor2 = new Floor(250, 100, 150);
    floor2._mesh.position.x = 0;
    floor2._mesh.position.y = -50;
    floor2._mesh.position.z = 145;

    const floorGeometry = new THREE.Geometry();
    floor1._mesh.updateMatrix();
    floorGeometry.merge(floor1.mesh.geometry, floor1.mesh.matrix);
    floor2._mesh.updateMatrix();
    floorGeometry.merge(floor2.mesh.geometry, floor2.mesh.matrix);

    const floor = new THREE.Mesh(floorGeometry, floor1.mat);
    floor.name          = 'floor';
    floor.receiveShadow = true;

    this._scene.add(floor);
  }

  createObjectPlayer() {
    const player = new Player();
    player._mesh.position.x = -20;
    player._mesh.position.y = 47;
    player._mesh.position.z = 200;

    this._objects.player = player;

    this._scene.add(player.mesh);
  }

  createObjectWater() {
    const water = new Water(250, 20, 125);
    water._mesh.position.x = 0;
    water._mesh.position.y = -100;
    water._mesh.position.z = 8;

    water._mesh.interactId       = 'Water1';
    water._mesh.interactCallback = this.interactWater;
    water._mesh.originalColor    = water._mesh.material.color.getHex();
    water._mesh.hoverColor       = 0xFFFF00;
    water._mesh.state            = 'idle';

    this._objects.water = water.mesh;
    this._objects.intersects.push(water.mesh);
    this._scene.add(water.mesh);
  }

  createObjectPlank() {
    const plank = new Plank(50, 10, 120);
    plank._mesh.position.x = -20;
    plank._mesh.position.y = -80;
    plank._mesh.position.z = 10;

    this._objects.plank = plank.mesh;
    this._scene.add(plank.mesh);
  }

  createObjectRock() {
    const rock = new Rock(30, 150, 30);
    rock._mesh.position.x = 100;
    rock._mesh.position.y = 75;
    rock._mesh.position.z = -100;

    rock._mesh.interactId            = 'Rock';
    rock._mesh.interactCallback      = this.interactRock;
    rock._mesh.interactDoneCallback  = this.interactRockDone;
    rock._mesh.originalColor         = rock._mesh.material.color.getHex();
    rock._mesh.hoverColor            = 0xFFFF00;
    rock._mesh.state                 = 'idle';

    this._objects.intersects.push(rock.mesh);
    this._objects.rock = rock.mesh;
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

    if ((obj.object.interactId === 'Water1' && type === 'water') || (CONFIG.DEBUG && obj.object.interactId === 'Water1' && type === 'click')) {
      obj.object.state = 'activated';

      this.eeEmit('scene-speech-helper-close');
      this.eeEmit('play-random-action-sound');

      obj.object.interactCallback(false);
      this.interactPlank();
      
      this._step++

      //this.endAnimation();
    }
    if ((obj.object.interactId === 'Rock' && type === 'wind') || (CONFIG.DEBUG && obj.object.interactId === 'Rock' && type === 'click')) {
      obj.object.state = 'activated';

      this.eeEmit('scene-speech-helper-close');
      this.eeEmit('play-random-action-sound');

      obj.object.interactCallback();
      this.interactPlank(true);
      this.objects.water.interactCallback(true);
      
      this._step++;

      //this.endAnimation();
    }
    if(this._step >= 2) this.endAnimation();
  }

  interactWater(isRockSubmerged) {
    this.material.color.set(0xff0000);

    /*const tl = new TimelineLite({
      onComplete: () => {
        this.state = 'disabled';
      },
    });*/

    const tl = new TimelineLite();
    if(isRockSubmerged) tl.delay(3);
    tl.to(this.scale, 3, { ease: Expo.easeInOut, y : this.scale.y + 1.8 });

    tl.play();
  }

  interactPlank(isRockSubmerged) {
    const tl = new TimelineLite();

    if(isRockSubmerged) tl.delay(3)
    tl.to(this._objects.plank.position, 3, { ease: Expo.easeInOut, y : this._objects.plank.position.y + 40 });

    tl.play();
  }

  interactRock() {
    const tl = new TimelineLite();

    tl.to(this.position, 3, {z: -30 })
      .to(this.position, 1, {ease : Bounce.easeOut, y: -50 });

    tl.play();
  }


  endAnimation() {
    const tl = new TimelineLite({
      onComplete: () => {
        this.eeEmit('scene-completed');
      },
    });

    tl.delay(4) // Dirty, but cannot have a callback on interactRock, neither an eventemitter event
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

export default SceneC;
