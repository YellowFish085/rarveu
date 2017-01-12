'use strict';

import * as THREE from 'three';

class Floor {
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

    this._mesh               = new THREE.Mesh(this._geom);
    this._mesh.name          = 'floor-item';
    this._mesh.receiveShadow = true;
  }

  createGeom() {
    this._geom = new THREE.BoxGeometry(this._w, this._h, this._d);
  }

  createMat() {
    this._mat  = new THREE.MeshLambertMaterial({
      color: 0xD3D3D3FF,
    });
  }

  get mesh() {
    return this._mesh;
  }

  get mat() {
    return this._mat;
  }
}

export default Floor;
