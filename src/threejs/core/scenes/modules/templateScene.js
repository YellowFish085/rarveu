/**
 * Template for Scenes Modules
 * If you want to add a module to the Scenes, juste create a module in the 'modules' directory based on this template and add it to the modules list.
 * The only two methods required are the constructor and the 'init' method.
 * You can use the base class 'Event' which implement the EventListener module used to communicate with the WebGL app.
 */
'use strict';

class TemplateScenes {
	constructor() {
		this._scene = new THREE.Scene();
	}

	/**
	 * Will be called when ScenesManager is initialized.
	 * Init what's necessary here.
	 */
	init() {

	}

	get scene() {
		return this._scene;
	}
}

export default TemplateScenes;