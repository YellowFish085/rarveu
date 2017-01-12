'use strict';

import * as THREE from 'three';

class GatePattern {
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
    this._mesh.name = 'gate_pattern';

    this._mesh.castShadow    = true;
    this._mesh.receiveShadow = true;
  }

  createGeom() {
    /*
     * width : 35
     * height: 20
     * depth : 5
     */

    const post         = new THREE.Mesh(new THREE.BoxGeometry(5, 20, 5));
    post.name          = 'gate_post';
    post.castShadow    = true;
    post.receiveShadow = true;
    post.position.x    = 0;
    post.position.z    = 0;
    post.position.y    = 0;

    this._geom.push({
      id  : 'gate_post',
      mesh: post,
    });

    const bar1         = new THREE.Mesh(new THREE.BoxGeometry(20, 3, 3));
    bar1.name          = 'gate_bar1';
    bar1.castShadow    = true;
    bar1.receiveShadow = true;
    bar1.position.x    = -12.5;
    bar1.position.z    = 0;
    bar1.position.y    = 8;

    this._geom.push({
      id  : 'gate_bar1',
      mesh: bar1,
    });

    const bar2         = new THREE.Mesh(new THREE.BoxGeometry(20, 3, 3));
    bar2.name          = 'gate_bar2';
    bar2.castShadow    = true;
    bar2.receiveShadow = true;
    bar2.position.x    = -12.5;
    bar2.position.z    = 0;
    bar2.position.y    = 2;

    this._geom.push({
      id  : 'gate_bar2',
      mesh: bar2,
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

export default GatePattern;
