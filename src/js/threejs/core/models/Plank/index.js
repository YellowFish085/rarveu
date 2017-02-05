'use strict';

import * as THREE from 'three';

class Plank {
  constructor(w, h, d) {
    this._mesh = null;
    this._geom = null;
    this._mat  = null;

    this._w = w;
    this._h = h;
    this._d = d;

    this.createMesh();
  }

  createMesh() {
    this.createMat();
    this.createGeom();

    this._mesh               = new THREE.Mesh(this._geom, this._mat);
    this._mesh.name          = 'plank';
    this._mesh.receiveShadow = true;
    this._mesh.castShadow    = true;
  }

  createGeom() {
    this._geom = new THREE.BoxGeometry(this._w, this._h, this._d);
  }

  createMat() {
    this._mat  = new THREE.MeshLambertMaterial({
      color: 0x5b3b19,
    });
  }

  get mesh() {
    return this._mesh;
  }
}

export default Plank;
