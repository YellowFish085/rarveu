'use strict';

import * as THREE from 'three';

class Sky {
  constructor() {
    this._mesh = null;
    this._geom = [];
    this._mat  = null;

    this.createMesh();
  }

  createMesh() {
    this.createMat();
    this.createGeom();

    this._mesh = new THREE.Object3D();

    this._mesh.name = 'sky';

    let i;
    for (i = 0; i < this._geom.length; i++) {
      this._mesh.add(this._geom[i].mesh);
    }
  }

  createGeom() {
    const nClouds = 100;

    let i;
    for (i = 0; i < nClouds; i++) {
      const c = this.createClouds();

      c.mesh.name = `cloud_${i}`;

      c.mesh.position.y = Math.floor(Math.random() * 400) + 50;
      c.mesh.position.x = Math.floor(Math.random() * 2000) - 1000;
      c.mesh.position.z = Math.floor(Math.random() * 2000) - 1000;

      const s = 1 + (Math.random() * 2);
      c.mesh.scale.set(s, s, s);

      this._geom.push(c);
    }
  }

  createClouds() {
    const cloud           = {};
    cloud.meshElements    = [];
    cloud.originalOpacity = Math.max(Math.min(0.1, Math.random()), 0.3);

    const geom  = new THREE.BoxGeometry(20, 20, 20);

    const nBlocs = 3 + Math.floor(Math.random() * 3);

    this._mat.opacity = cloud.originalOpacity;

    const cloudGeometry = new THREE.Geometry();

    let i;
    for (i = 0; i < nBlocs; i++) {
      const m = new THREE.Mesh(geom, this._mat.clone());
      m.name = `cloud-item_${i}`;

      // set the position and the rotation of each cube randomly
      m.position.x = i * 15;
      m.position.y = Math.random() * 10;
      m.position.z = Math.random() * 10;
      m.rotation.z = Math.random() * Math.PI * 2;
      m.rotation.y = Math.random() * Math.PI * 2;

      // set the size of the cube randomly
      const s = 0.1 + (Math.random() * 0.9);
      m.scale.set(s, s, s);

      m.castShadow    = true;
      m.receiveShadow = true;

      m.updateMatrix();
      cloudGeometry.merge(m.geometry, m.matrix);
    }

    cloud.mesh = new THREE.Mesh(cloudGeometry, this._mat.clone());

    return cloud;
  }

  createMat() {
    this._mat  = new THREE.MeshLambertMaterial({
      color: 0xFFFFFF,
    });

    this._mat.transparent = true;
  }

  update() {
    let i;
    for (i = 0; i < this._geom.length; i++) {
      this._geom[i].mesh.position.z += 0.1;
      this._geom[i].mesh.position.x += -0.3;

      if (this._geom[i].mesh.position.x <= -500) {
        this._geom[i].mesh.material.opacity -= 0.01;

        if (this._geom[i].mesh.material.opacity <= 0) {
          this._geom[i].mesh.position.x = 1000;
          this._geom[i].mesh.material.opacity = 1;
        }
      }
    }
  }

  get mesh() {
    return this._mesh;
  }
}

export default Sky;
