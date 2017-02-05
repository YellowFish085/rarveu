'use strict';

import * as THREE       from 'three';
import STEREO           from 'three-stereo-effect';

import * as CONFIG      from '../config';
import Log              from '../../utils/log';
import DeviceOrientationController from '../../utils/DeviceOrientationControls';

import EventEmitter     from '../../classes/EventEmitter';

import EventsController from '../events/eventsController';
import ScenesController from '../scenes/scenesController';

const StereoEffect = new STEREO(THREE);

/**
 * WebGL with three.js
 */
class WebGL extends EventEmitter {
  constructor() {
    super(); // EventEmitter constructor. See 'core/events/extends/eventEmitter.js'

    this._containerId      = CONFIG.WEBGL.CONTAINER_ID; // DOM container id
    this._scenesController = null;                      // Scene controller
    this._camera           = null;                      // Three Camera
    this._renderer         = null;                      // Three Renderer
    this._eventsController = null;                      // EventController
    this._stereoEffect     = null;                      // StereoEffect
    this._isStereo         = false;                     // Flag
    this._controls         = null;                      // Controls (device orientation)

    this.init();
  }

  init() {
    this.bind();

    this.createScenesController();
    this.createEventsController();
    this.createCamera();
    this.createRenderer();
    this.createStereoEffect();
    this.createControls();

    this.addEventListener();

    // Add renderer in DOM
    document.getElementById(this._containerId).appendChild(this._renderer.domElement);
  }

  bind() {
    this.onResize = this.onResize.bind(this);
    this.setStereo = this.setStereo.bind(this);
  }

  /**
   * Create three.js Scene
   */
  createScenesController() {
    this._scenesController = new ScenesController();
  }

  /**
   * Create events controller
   */
  createEventsController() {
    this._eventsController = new EventsController();
  }

  /**
   * Create three.js Camera with params in the config files
   */
  createCamera() {
    this._camera = new THREE.PerspectiveCamera(
      CONFIG.WEBGL.CAMERA.fov,
      CONFIG.WEBGL.CAMERA.aspect,
      CONFIG.WEBGL.CAMERA.near,
      CONFIG.WEBGL.CAMERA.far,
    );

    this._camera.position.x = CONFIG.WEBGL.CAMERA.position.x;
    this._camera.position.y = CONFIG.WEBGL.CAMERA.position.y;
    this._camera.position.z = CONFIG.WEBGL.CAMERA.position.z;

    this._camera.lookAt(new THREE.Vector3(0, 0, 0));
  }

  createControls(){
    this._controls = new DeviceOrientationController(this._camera, document.getElementById(this._containerId));
    //controls will be connected once user starts the game.
  }

  /**
   * Create three.js Renderer with params in the config files
   */
  createRenderer() {
    this._renderer = new THREE.WebGLRenderer({
      alpha    : true,
      antialias: true,
    });
    this._renderer.setSize(CONFIG.WEBGL.WEBGL_WIDTH, CONFIG.WEBGL.WEBGL_HEIGHT);
    // this._renderer.shadowMap.enabled = true;
  }

  createStereoEffect() {
    this._stereoEffect = new StereoEffect(this._renderer);
    this._stereoEffect.eyeSeparation = 2;
    this._stereoEffect.setSize(CONFIG.WEBGL.WEBGL_WIDTH, CONFIG.WEBGL.WEBGL_HEIGHT);
  }

  /**
   * Add events listeners
   */
  addEventListener() {
    window.addEventListener('resize', this.onResize);
    this.eeListen('stereoKey', this.setStereo);
  }

  /**
   * Resize three.js canvas on window resize
   */
  onResize(e) {
    this._camera.aspect = window.innerWidth / window.innerHeight;
    this._camera.updateProjectionMatrix();
    this._renderer.setSize(window.innerWidth, window.innerHeight);
    this._stereoEffect.setSize(window.innerWidth, window.innerHeight);

    this.eeEmit('resize');
  }

  setStereo() {
    this._isStereo = !this._isStereo;
    this.onResize('default');
  }

  /**
   * Update the scene
   * Called each frame
   */
  update() {
    this._controls.update();
    this._scenesController.update();

    var renderer = this._isStereo ? this._stereoEffect : this._renderer;
    renderer.render(this._scenesController.currentScene.scene, this._camera);
  }
}

export default WebGL;
