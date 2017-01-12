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

    this._mesh = new THREE.Object3D();
    this._mesh.name = 'gate_pattern';

    let i;
    for (i = 0; i < this._geom.length; i++) {
      this._mesh.add(this._geom[i].mesh);
    }

    this._mesh.castShadow = true;
    this._mesh.receiveShadow = true;
  }

  createGeom() {
    /*
     * width : 35
     * height: 20
     * depth : 5
     */

    const post         = new THREE.Mesh(new THREE.BoxGeometry(5, 20, 5), this._mat);
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

    const bar1         = new THREE.Mesh(new THREE.BoxGeometry(20, 3, 3), this._mat);
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

    const bar2         = new THREE.Mesh(new THREE.BoxGeometry(20, 3, 3), this._mat);
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
    this._mat  = new THREE.MeshPhongMaterial({
      // color — geometry color in hexadecimal. Default is 0xffffff.
      color: 0x63350e,
      // specular — Set specular color. Default is 0x111111 .
      // shininess — Set shininess Default is 30.
      // map — Set texture map. Default is null.
      // lightMap — Set light map. Default is null.
      // lightMapIntensity — Set light map intensity. Default is 1.
      // aoMap — Set ao map. Default is null.
      // aoMapIntensity — Set ao map intensity. Default is 1.
      // emissive - Set emissive color. Default is 0x000000.
      // emissiveMap — Set emissive map. Default is null.
      // emissiveIntensity — Set emissive map intensity. Default is 1.
      // bumpMap — Set bump map. Default is null.
      // bumpScale — Set bump map scale. Default is 1.
      // normalMap — Set normal map. Default is null.
      // normalScale — Set normal map scale. Default is (1, 1).
      // displacementMap — Set displacement map. Default is null.
      // displacementScale — Set displacement scale. Default is 1.
      // displacementBias — Set displacement offset. Default is 0.
      // specularMap — Set specular map. Default is null.
      // alphaMap — Set alpha map. Default is null.
      // envMap — Set env map. Default is null.
      // combine — Set combine operation. Default is THREE.MultiplyOperation.
      // reflectivity — Set reflectivity. Default is 1.
      // refractionRatio — Set refraction ratio. Default is 0.98.
      // fog — Define whether the material color is affected by global fog settings. Default is true.
      // shading — Define shading type. Default is THREE.SmoothShading.
      // wireframe — render geometry as wireframe. Default is false.
      // wireframeLinewidth — Line thickness. Default is 1.
      // wireframeLinecap — Define appearance of line ends. Default is 'round'.
      // wireframeLinejoin — Define appearance of line joints. Default is 'round'.
      // vertexColors — Define how the vertices gets colored. Default is THREE.NoColors.
      // skinning — Define whether the material uses skinning. Default is false.
      // morphTargets — Define whether the material uses morphTargets. Default is false.
      // morphNormals — Define whether the material uses morphNormals. Default is false.
    });
  }

  get mesh() {
    return this._mesh;
  }
}

export default GatePattern;
