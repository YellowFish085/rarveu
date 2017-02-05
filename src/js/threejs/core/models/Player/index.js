'use strict';

import * as THREE from 'three';

class Player {
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
    this._mesh.name = 'player';

    let i;
    for (i = 0; i < this._geom.length; i++) {
      this._mesh.add(this._geom[i].mesh);
    }

    this._mesh.castShadow = true;
    this._mesh.receiveShadow = true;
  }

  createGeom() {
    /**
     * width : 16
     * depth : 12
     * height: 47
     */

    // HEAD
    // Face
    const headFaceMat = this._mat.clone();
    headFaceMat.color.setHex(0xf2eeb0);

    const headFaceMesh         = new THREE.Mesh(new THREE.BoxGeometry(10, 10, 10), headFaceMat);
    headFaceMesh.name          = 'head_face';
    headFaceMesh.castShadow    = true;
    headFaceMesh.receiveShadow = true;
    headFaceMesh.position.x    = 0;
    headFaceMesh.position.z    = 0;
    headFaceMesh.position.y    = 0;

    // Hair
    const headHairMat = this._mat.clone();
    headHairMat.color.setHex(0x3b2919);

    const headHairMesh1         = new THREE.Mesh(new THREE.BoxGeometry(12, 12, 4), headHairMat);
    headHairMesh1.name          = 'head_hair-item_1';
    headHairMesh1.castShadow    = true;
    headHairMesh1.receiveShadow = true;
    headHairMesh1.position.x    = 0;
    headHairMesh1.position.z    = 4;
    headHairMesh1.position.y    = 0;
    const headHairMesh2      = new THREE.Mesh(new THREE.BoxGeometry(8, 8, 4), headHairMat);
    headHairMesh2.name       = 'head_hair-item_2';
    headHairMesh2.position.x = 0;
    headHairMesh2.position.z = 5;
    headHairMesh2.position.y = 0;
    const headHairMesh3         = new THREE.Mesh(new THREE.BoxGeometry(12, 3, 12), headHairMat);
    headHairMesh3.name          = 'head_hair-item_3';
    headHairMesh3.castShadow    = true;
    headHairMesh3.receiveShadow = true;
    headHairMesh3.position.x    = 0;
    headHairMesh3.position.z    = 0;
    headHairMesh3.position.y    = 5;
    const headHairMesh4      = new THREE.Mesh(new THREE.BoxGeometry(8, 3, 8), headHairMat);
    headHairMesh4.name       = 'head_hair-item_4';
    headHairMesh4.position.x = 0;
    headHairMesh4.position.z = -1;
    headHairMesh4.position.y = 6;

    const headHairGeometry = new THREE.Geometry();
    headHairMesh1.updateMatrix();
    headHairGeometry.merge(headHairMesh1.geometry, headHairMesh1.matrix);
    headHairMesh2.updateMatrix();
    headHairGeometry.merge(headHairMesh2.geometry, headHairMesh2.matrix);
    headHairMesh3.updateMatrix();
    headHairGeometry.merge(headHairMesh3.geometry, headHairMesh3.matrix);
    headHairMesh4.updateMatrix();
    headHairGeometry.merge(headHairMesh4.geometry, headHairMesh4.matrix);

    const headHairMesh         = new THREE.Mesh(headHairGeometry, headHairMat);
    headHairMesh.name          = 'head_hair';
    headHairMesh.castShadow    = true;
    headHairMesh.receiveShadow = true;

    const headMesh         = new THREE.Mesh();
    headMesh.name          = 'head';
    headMesh.castShadow    = true;
    headMesh.receiveShadow = true;
    headMesh.add(headFaceMesh);
    headMesh.add(headHairMesh);

    headMesh.position.x = 0;
    headMesh.position.y = 0;
    headMesh.position.z = 0;

    this._geom.push({
      id  : 'head',
      mesh: headMesh,
    });

    // BODY
    // Torso
    const bodyTorsoMat = this._mat.clone();
    bodyTorsoMat.color.setHex(0xb41414);

    const bodyTorsoMesh         = new THREE.Mesh(new THREE.BoxGeometry(12, 20, 5), bodyTorsoMat);
    bodyTorsoMesh.name          = 'body_torso';
    bodyTorsoMesh.castShadow    = true;
    bodyTorsoMesh.receiveShadow = true;

    // Arms
    const bodyArmsMat = this._mat.clone();
    bodyArmsMat.color.setHex(0xf26161);

    const bodyArmLeftMesh         = new THREE.Mesh(new THREE.BoxGeometry(4, 22, 4), bodyArmsMat);
    bodyArmLeftMesh.name          = 'body_leftArm';
    bodyArmLeftMesh.castShadow    = true;
    bodyArmLeftMesh.receiveShadow = true;
    bodyArmLeftMesh.position.x    = -8.5;
    bodyArmLeftMesh.position.z    = 0;
    bodyArmLeftMesh.position.y    = -2;
    const bodyArmRightMesh         = new THREE.Mesh(new THREE.BoxGeometry(4, 22, 4), bodyArmsMat);
    bodyArmRightMesh.name          = 'body_rightArm';
    bodyArmRightMesh.castShadow    = true;
    bodyArmRightMesh.receiveShadow = true;
    bodyArmRightMesh.position.x    = 8.5;
    bodyArmRightMesh.position.z    = 0;
    bodyArmRightMesh.position.y    = -2;

    // Legs
    const bodyLegsMat = this._mat.clone();
    bodyLegsMat.color.setHex(0x173b2f);

    const bodyLegLeftMesh         = new THREE.Mesh(new THREE.BoxGeometry(5, 22, 5), bodyLegsMat);
    bodyLegLeftMesh.name          = 'body_legLeft';
    bodyLegLeftMesh.castShadow    = true;
    bodyLegLeftMesh.receiveShadow = true;
    bodyLegLeftMesh.position.x    = -3;
    bodyLegLeftMesh.position.z    = 0;
    bodyLegLeftMesh.position.y    = -21;
    const bodyLegRightMesh         = new THREE.Mesh(new THREE.BoxGeometry(5, 22, 5), bodyLegsMat);
    bodyLegRightMesh.name          = 'body_legRight';
    bodyLegRightMesh.castShadow    = true;
    bodyLegRightMesh.receiveShadow = true;
    bodyLegRightMesh.position.x    = 3;
    bodyLegRightMesh.position.z    = 0;
    bodyLegRightMesh.position.y    = -21;

    const bodyMesh         = new THREE.Mesh();
    bodyMesh.name          = 'body';
    bodyMesh.castShadow    = true;
    bodyMesh.receiveShadow = true;
    bodyMesh.add(bodyTorsoMesh);
    bodyMesh.add(bodyArmLeftMesh);
    bodyMesh.add(bodyArmRightMesh);
    bodyMesh.add(bodyLegLeftMesh);
    bodyMesh.add(bodyLegRightMesh);

    bodyMesh.position.x = 0;
    bodyMesh.position.y = -15;
    bodyMesh.position.z = 0;

    this._geom.push({
      id       : 'body',
      mesh     : bodyMesh,
      childrens: {
        leftArm : bodyArmLeftMesh,
        rightArm: bodyArmRightMesh,
        leftLeg : bodyLegLeftMesh,
        rightLeg: bodyLegRightMesh,
      },
    });
  }

  createMat() {
    this._mat  = new THREE.MeshLambertMaterial({ });
  }

  get mesh() {
    return this._mesh;
  }
}

export default Player;
