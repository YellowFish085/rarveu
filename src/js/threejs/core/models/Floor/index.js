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

    this._mesh = new THREE.Mesh(this._geom, this._mat);
    this._mesh.receiveShadow = true;
  }

  createGeom() {
    this._geom = new THREE.BoxGeometry(this._w, this._h, this._d);
  }

  createMat() {
    this._mat  = new THREE.MeshPhongMaterial({
      // color — geometry color in hexadecimal. Default is 0xffffff.
      color: 0xD3D3D3FF,
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

export default Floor;
