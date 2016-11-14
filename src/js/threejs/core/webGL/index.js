'use strict';

import * as THREE       from 'three';

import * as CONFIG      from '../config';
import Log              from '../../utils/log';

import EventEmitter     from '../../classes/EventEmitter';

import EventsController from '../events/eventsController';
import ScenesController from '../scenes/scenesController';

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
		this._events           = null;                      // EventController
		
		this.init();
	}

	init() {
		this.bind();

		this.createScenesController();
		this.createCamera();
		this.createRenderer();

		this.addEventListener();

		this._events = new EventsController();

		// Add renderer in DOM
		document.getElementById(this._containerId).appendChild(this._renderer.domElement);
	}

	bind() {
		this.onResize = this.onResize.bind(this);
	}

	/**
	 * Create three.js Scene
	 */
	createScenesController() {
		this._scenesController = new ScenesController();
	}

	/**
	 * Create three.js Camera with params in the config files
	 */
	createCamera() {
		this._camera = new THREE.PerspectiveCamera(
			CONFIG.WEBGL.CAMERA.fov,
			CONFIG.WEBGL.CAMERA.aspect,
			CONFIG.WEBGL.CAMERA.near,
			CONFIG.WEBGL.CAMERA.far
		);

		this._camera.position.x = CONFIG.WEBGL.CAMERA.position.x;
		this._camera.position.y = CONFIG.WEBGL.CAMERA.position.y;
		this._camera.position.z = CONFIG.WEBGL.CAMERA.position.z;

		this._camera.lookAt(new THREE.Vector3(0, 0, 0));
	}

	/**
	 * Create three.js Renderer with params in the config files
	 */
	createRenderer() {
		this._renderer = new THREE.WebGLRenderer();
		this._renderer.setSize(CONFIG.WEBGL.WEBGL_WIDTH, CONFIG.WEBGL.WEBGL_HEIGHT);
	}

	/**
	 * Add events listeners
	 */
	addEventListener() {
		window.addEventListener('resize', this.onResize);
	}

	/**
	 * Resize three.js canvas on window resize
	 */
	onResize(e) {
		this._camera.aspect = window.innerWidth / window.innerHeight;
		this._camera.updateProjectionMatrix();
		this._renderer.setSize(window.innerWidth, window.innerHeight);

		this.eeEmit('resize');
	}

	/**
	 * Update the scene
	 * Called each frame
	 */
	update() {	
		this._scenesController.update();
		this._renderer.render(this._scenesController.currentScene.scene, this._camera);
	}
}

export default WebGL;
