'use strict';

/**
 * WebGL
 */
export const CONTAINER_ID = 'main';

export const WEBGL_WIDTH  = window.innerWidth;

export const WEBGL_HEIGHT = window.innerHeight;

/**
 * Camera
 */
export const CAMERA = {
	fov: 75,
	aspect: window.innerWidth / window.innerHeight,
	near: 1,
	far: 1000,
	position: {
		x: 0,
		y: 0,
		z: 100
	}
};