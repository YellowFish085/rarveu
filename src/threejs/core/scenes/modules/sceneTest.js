'use strict';

import * as THREE from 'three';

import EventEmitter from '../../classes/EventEmitter';

class SceneTest extends EventEmitter {
	constructor() {
		super();
		this._scene         = null;
		this._loader        = null;
		
		this._animationClip = null;
		this._mixer         = null;
		this._clock         = null;
	}

	/**
	 * Will be called when ScenesManager is initialized.
	 * Init what's necessary here.
	 */
	init(loadingManager) {
		this._clock  = new THREE.Clock();
		this._scene  = new THREE.Scene()
		this._loader = new THREE.ObjectLoader(loadingManager);
	}

	load() {
		this._loader.load("assets/threejs/models/test.json", function ( loadedScene ) {
			this._animationClip = loadedScene.animations[0];
			this._scene         = loadedScene;
			this._scene.fog     = new THREE.Fog( 0xffffff, 2000, 10000 );

			this._mixer         = new THREE.AnimationMixer( this._scene );
			this._mixer.clipAction( this._animationClip ).play();
		}.bind(this));
	}

	update() {
		var delta = 0.75 * this._clock.getDelta();
		if( this._mixer ) {
			//console.log( "updating mixer by " + delta );
			this._mixer.update( delta );
		}
	}

	get scene() {
		return this._scene;
	}
}

export default SceneTest;