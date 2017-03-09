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
    this._isStereo         = true;                     // Flag
    this._controls         = null;                      // Controls (device orientation)
    this._raycaster        = null;
    this._arrow            = null;
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
    this.createRayCaster();

    this.addEventListener();

    // Add renderer in DOM
    document.getElementById(this._containerId).appendChild(this._renderer.domElement);

  }

  bind() {
    this.onResize = this.onResize.bind(this);
    this.setStereo = this.setStereo.bind(this);
    this.castRay = this.castRay.bind(this);
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

  createRayCaster() {
    this._raycaster = new THREE.Raycaster();

    //helper Ray
    if(CONFIG.DEBUG){
      var vector = new THREE.Vector3( 0, 0, -1 );
      vector.applyQuaternion( this._camera.quaternion );
      this._arrow = new THREE.ArrowHelper(vector, this._camera.position, 100, 0xdddddd );
      this._scenesController.currentScene.scene.add( this._arrow );
    }

  }

  /**
   * Add events listeners
   */
  addEventListener() {
    if (CONFIG.DEBUG) {
      this.eeListen('mouseclick', this.castRay);
    }

    window.addEventListener('resize', this.onResize);
    this.eeListen('stereoKey', this.setStereo);
    this.eeListen('speech-water', this.castRay);
    this.eeListen('speech-fire', this.castRay);
    this.eeListen('speech-electricity', this.castRay);
    this.eeListen('speech-wind', this.castRay);
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

  castRay(e) {
    console.log(e);
    this._raycaster.setFromCamera({
      x: ((e.x / window.innerWidth) * 2) - 1,
      y: -((e.y / window.innerHeight) * 2) + 1,
    },
    this._camera);
    const intersects = this._raycaster.intersectObjects(this._scenesController.currentScene.objects.intersects, true);

    let i;
    for (i = 0; i < intersects.length; i++) {
      this._scenesController.currentScene.interact(intersects[i], e.type);
    }
  }

  /**
   * Update the scene
   * Called each frame
   */
  update() {
    this._controls.update();
    this._scenesController.update();

    if(CONFIG.DEBUG){
      var vector = new THREE.Vector3( 0, 0, -1 );
      vector.applyQuaternion( this._camera.quaternion );
      this._arrow.setDirection(vector);
    }

    const renderer = this._isStereo ? this._stereoEffect : this._renderer;
    renderer.render(this._scenesController.currentScene.scene, this._camera);
  }
}


export default WebGL;
