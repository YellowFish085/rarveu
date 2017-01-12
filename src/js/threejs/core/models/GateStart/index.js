'use strict';

import * as THREE from 'three';

class GateStart {
  constructor() {
    this._mesh = null;
    this._geom = [];
    this._mat  = null;
    this.createMesh();
  }

  createMesh() {
    this.createMat();
    this.createGeom();

    const singleGeometry = new THREE.Geometry();

    let i;
    for (i = 0; i < this._geom.length; i++) {
      this._geom[i].mesh.updateMatrix();
      singleGeometry.merge(this._geom[i].mesh.geometry, this._geom[i].mesh.matrix);
    }

    this._mesh      = new THREE.Mesh(singleGeometry, this._mat);
    this._mesh.name = 'gate_start';

    this._mesh.castShadow = true;
    this._mesh.receiveShadow = true;
  }

  createGeom() {
    /*
     * width : 5
     * height: 20
     * depth : 5
     */

    const post         = new THREE.Mesh(new THREE.BoxGeometry(5, 20, 5), this._mat);
    post.name          = 'gateStart_post';
    post.castShadow    = true;
    post.receiveShadow = true;
    post.position.x    = 0;
    post.position.z    = 0;
    post.position.y    = 0;

    this._geom.push({
      id  : 'gateStart_post',
      mesh: post,
    });
  }

  createMat() {
    this._mat  = new THREE.MeshLambertMaterial({
      color: 0x63350e,
    });
  }

  get mesh() {
    return this._mesh;
  }

  get mat() {
    return this._mat;
  }
}

export default GateStart;
