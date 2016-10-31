'use strict';

import dat from 'dat-gui';
import Stats from 'stats.js';

import * as CONFIG from './core/config/config';
import Log from './core/utils/log';

import WebGL from './core/webGL/webGL';

/**
 * Main App
 */
class App {
	constructor(args) {
		this._gui   = null; // GUI
		this._stats = null; // Stats
		this._webGL = null; // WebGL
		
		this.initWebGL();

		this.createGUI();
		this.createStats();

		this.render();
	}

	/**
	 * Initialize WebGL
	 */
	initWebGL() {
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