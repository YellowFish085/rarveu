'use strict';

import * as THREE from 'three';

import * as CONFIG from '../config/config';
import Log from '../utils/log';

import EventEmitter from '../events/extends/EventEmitter';

import EventsController from '../events/eventsController';

/**
 * WebGL with three.js
 */
class WebGL extends EventEmitter {
	constructor() {
		super(); // EventEmitter constructor. See 'core/events/extends/eventEmitter.js'

		this._containerId = CONFIG.WEBGL.CONTAINER_ID; // DOM container id
		this._scene       = null;                      // Three Scene
		this._camera      = null;                      // Three Camera
		this._renderer    = null;                      // Three Renderer
		
		this.init();
	}

	init() {
		this.bind();

		this.createScene();
		this.createCamera();
		this.createRenderer();

		this.addEventListener();

		this._events = new EventsController();

		document.getElementById(this._containerId).appendChild(this._renderer.domElement);
	}

	bind() {
		this.onResize = this.onResize.bind(this);
	}

	addEventListener() {
		window.addEventListener('resize', this.onResize);
	}

	onResize(e) {
		this._camera.aspect = window.innerWidth / window.innerHeight;
		this._camera.updateProjectionMatrix();
		this._renderer.setSize(window.innerWidth, window.innerHeight);

		this.eeEmit('resize');
	}

	/**
	 * Create three.js Scene
	 */
	createScene() {
		this._scene = new THREE.Scene();
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
	 * Update the scene
	 * Called each frame
	 */
	update() {		
		this._renderer.render(this._scene, this._camera);
	}
}

export default WebGL;
