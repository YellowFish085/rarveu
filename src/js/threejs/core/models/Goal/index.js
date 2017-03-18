'use strict';

import * as THREE from 'three';

class Goal {
  constructor(w, h, d) {
    this._mesh = null;
    this._geom = [];
    this._mat  = null;

    this._w = w;
    this._h = h;
    this._d = d;

    this.createMesh();
  }

  createMesh() {
    this.createMat();
    this.createGeom();

    this._mesh               = new THREE.Mesh();
    this._mesh.castShadow    = true;
    this._mesh.receiveShadow = true;
    this._mesh.name          = 'goal';

    let i;
    for (i = 0; i < this._geom.length; i++) {
      this._geom[i].mesh.updateMatrix();
      this._mesh.add(this._geom[i].mesh);
    }
  }

  createGeom() {
    const ring1 = new THREE.Mesh(new THREE.TorusGeometry(10, 1, 3, 10), this._mat);
    ring1.castShadow = false;
    ring1.receiveShadow = false;
    ring1.position.x = 0;
    ring1.position.y = 75;
    ring1.position.z = 0;
    ring1.rotation.x = 1.5708; // 90°

    this._geom.push({
      id  : 'ring1',
      mesh: ring1,
    });

    const ring2 = new THREE.Mesh(new THREE.TorusGeometry(5, 1, 3, 5), this._mat);
    ring2.castShadow = false;
    ring2.receiveShadow = false;
    ring2.position.x = 0;
    ring2.position.y = 75;
    ring2.position.z = 0;
    ring2.rotation.x = 1.5708; // 90°

    this._geom.push({
      id  : 'ring2',
      mesh: ring2,
    });

    const ring3 = new THREE.Mesh(new THREE.TorusGeometry(10, 1, 3, 10), this._mat);
    ring3.castShadow = false;
    ring3.receiveShadow = false;
    ring3.position.x = 0;
    ring3.position.y = 0;
    ring3.position.z = 0;
    ring3.rotation.x = 1.5708; // 90°

    this._geom.push({
      id  : 'ring3',
      mesh: ring3,
    });
  }

  createMat() {
    this._mat  = new THREE.MeshLambertMaterial({
      color: 0xd51e05,
    });
  }

  update() {
    this._geom[0].mesh.rotation.x += 0.05;
    this._geom[1].mesh.rotation.y -= 0.05;
    this._geom[2].mesh.rotation.z -= 0.05;
  }

  get mesh() {
    return this._mesh;
  }
}

export default Goal;
