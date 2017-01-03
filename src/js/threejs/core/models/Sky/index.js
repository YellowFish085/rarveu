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

      c.mesh.position.y = Math.floor(Math.random() * 400) + 100;
      c.mesh.position.x = Math.floor(Math.random() * 2000) - 1000;
      c.mesh.position.z = Math.floor(Math.random() * 2000) - 1000;

      const s = 1 + (Math.random() * 2);
      c.mesh.scale.set(s, s, s);

      this._geom.push(c);
    }
  }

  createClouds() {
    const cloud           = {};
    cloud.mesh            = new THREE.Object3D();
    cloud.meshElements    = [];
    cloud.originalOpacity = Math.max(Math.min(0.1, Math.random()), 0.3);

    const geom  = new THREE.BoxGeometry(20, 20, 20);

    const nBlocs = 3 + Math.floor(Math.random() * 3);

    this._mat.opacity = cloud.originalOpacity;

    let i;
    for (i = 0; i < nBlocs; i++) {
      const m = new THREE.Mesh(geom, this._mat.clone());

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

      cloud.mesh.add(m);
      cloud.meshElements.push(m);
    }

    return cloud;
  }

  createMat() {
    this._mat  = new THREE.MeshPhongMaterial({
      // color — geometry color in hexadecimal. Default is 0xffffff.
      color: 0xFFFFFF,
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

    this._mat.transparent = true;
  }

  update() {
    let i;
    for (i = 0; i < this._geom.length; i++) {
      this._geom[i].mesh.position.z += 0.1;
      this._geom[i].mesh.position.x += -0.3;

      if (this._geom[i].mesh.position.x <= -500) {
        let j;
        for (j = 0; j < this._geom[i].mesh.children.length; j++) {
          this._geom[i].mesh.children[j].material.opacity -= 0.01;
        }

        if (this._geom[i].mesh.children[0].material.opacity <= 0) {
          this._geom[i].mesh.position.x = 1000;

          for (j = 0; j < this._geom[i].mesh.children.length; j++) {
            this._geom[i].mesh.children[j].material.opacity = this._geom[i].originalOpacity;
          }
        }
      }
    }
  }

  get mesh() {
    return this._mesh;
  }
}

export default Sky;
