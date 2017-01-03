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
  fov     : 75,
  aspect  : window.innerWidth / window.innerHeight,
  near    : 1,
  far     : 10000,
  position: {
    x: 250,
    y: 250,
    z: 250,
  },
};
