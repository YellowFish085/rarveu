'use strict';

import dat from 'dat-gui';
import Stats from 'stats.js';
import Vue from 'vue/dist/vue';

import * as CONFIG from './core/config';
import Log from './utils/log';

import EventEmitter from './classes/EventEmitter';

import WebGL from './core/webGL';
import Hud from './core/hud';

/**
 * Main App
 */
class App extends EventEmitter {
	constructor(args) {
		super();

		this._gui   = null; // GUI
		this._stats = null; // Stats
		this._webGL = null; // WebGL
		this._hud   = null; // VueJS HUD
		
		this.createHUD();
		this.createWebGL();
		this.createGUI();
		this.createStats();

		this.addEventListener();

		this.render();
	}

	/**
	 * Initialize VueJS HUD
	 */
	createHUD() {
		this._hud = new Hud({
			el: '#hud'
		});
	}

	/**
	 * Initialize WebGL
	 */
	createWebGL() {
		this._webGL = new WebGL();
	}

	/**
	 * Create a GUI with params specified in the config files
	 */
	createGUI() {
		this._gui = new dat.GUI();

		this._gui.domElement.style.display = CONFIG.DEBUG ? 'block' : 'none';

		// GUI options
		let cameraFolder = this._gui.addFolder('Camera');
		cameraFolder.add(this._webGL._camera.position, 'x', -10, 10);
		cameraFolder.add(this._webGL._camera.position, 'y', -10, 10);
		cameraFolder.add(this._webGL._camera.position, 'z', 50, 150);
	}

	/**
	 * Create Stats with params specified in the config files
	 */
	createStats() {
		this._stats = new Stats();
		this._stats.setMode(CONFIG.STATS.STATS_MODE);


		this._stats.domElement.style.display  = CONFIG.DEBUG ? 'block' : 'none';
		this._stats.domElement.style.position = CONFIG.STATS.STATS_STYLE.position;
		this._stats.domElement.style.top      = CONFIG.STATS.STATS_STYLE.top;
		this._stats.domElement.style.left     = CONFIG.STATS.STATS_STYLE.left;

		document.body.appendChild(this._stats.domElement);
	}

	/**
	 * Add events listeners
	 */
	addEventListener() {
		// Temp event
		this.eeListen('loading-progress', function(percentage) {
			this._hud.loadingPercentage = percentage;
		}.bind(this));

		// Temp event
		this.eeListen('loading-end', function() {
			this._hud.loadingPercentage = 100;
			setTimeout(function() {
				this._hud.isLoading = false;

				setTimeout(this.displayThreeJS, 500);
			}.bind(this), 500)
		}.bind(this));

		// Temp event
		this.eeListen('scene-changed', function(id) {
			this._hud.sceneId = id;
		}.bind(this))
	}

	/**
	 * Display three.js container
	 */
	displayThreeJS() {
		var el = document.getElementById('main');
		
		let tl = new TimelineMax({
			paused: true
		});

		tl.fromTo(el, 1, { 'opacity': 0	}, { 'opacity': 1 }, '-=0');
		tl.play();
	}

	/**
	 * Render the WebGL scene
	 */
	render() {
		this._stats.begin();

		this._webGL.update();

		this._stats.end();

		requestAnimationFrame(this.render.bind(this));
	}
}

export default App;