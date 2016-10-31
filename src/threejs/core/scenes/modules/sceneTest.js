'use strict';

import * as THREE from 'three';

import EventEmitter from '../../classes/EventEmitter';

class SceneTest extends EventEmitter {
	constructor() {
		super();
		this._scene = new THREE.Scene();
	}

	/**
	 * Will be called when ScenesManager is initialized.
	 * Init what's necessary here.
	 */
	init(loadingManager) {

	}

	get scene() {
		return this._scene;
	}
}

export default SceneTest;