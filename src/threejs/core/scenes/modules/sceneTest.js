'use strict';

import * as THREE from 'three';

class SceneTest {
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

export default SceneTest;