'use strict';

import * as THREE       from 'three';
import dat              from 'dat-gui';
import Stats            from 'stats.js';
import { TimelineLite } from 'gsap';

import * as CONFIG      from './core/config';

import EventEmitter     from './classes/EventEmitter';

import WebGL            from './core/webGL';
import Hud              from './core/hud';
import SoundManager     from './core/sound';

/**
 * Main App
 */
class App extends EventEmitter {
  constructor() {
    super();

    this._gui   = null; // GUI
    this._stats = null; // Stats
    this._webGL = null; // WebGL
    this._hud   = null; // VueJS HUD

    this.bind();

    this.addEventListener();

    this.createGUI();
    this.createStats();
    this.createHUD();
    this.createSounds();
    this.createWebGL();

    this.initGUI();
  }

  bind() {
    this.displayThreeJS = this.displayThreeJS.bind(this);
    this.nextScene      = this.nextScene.bind(this);
  }

  /**
   * Initialize VueJS HUD
   */
  createHUD() {
    this._hud = new Hud({
      el: '#hud',
    });
  }

  createSounds() {
    this._soundsManager = new SoundManager();
  }

  /**
   * Initialize WebGL
   */
  createWebGL() {
    this._webGL = new WebGL();
  }

  /**
   * Create a GUI with params specified in the config files
   */
  createGUI() {
    if (!CONFIG.DEBUG) return;

    window.threeJSGui = new dat.GUI();
  }

  initGUI() {
    if (!CONFIG.DEBUG) return;

    // GUI options
    const cameraFolder = window.threeJSGui.addFolder('Camera');
    const c1 = cameraFolder.add(this._webGL._camera.position, 'x', -360, 360);
    const c2 = cameraFolder.add(this._webGL._camera.position, 'y', -360, 360);
    const c3 = cameraFolder.add(this._webGL._camera.position, 'z', -360, 360);

    c1.onChange(() => {
      this._webGL._camera.lookAt(new THREE.Vector3(0, 0, 0));
    });
    c2.onChange(() => {
      this._webGL._camera.lookAt(new THREE.Vector3(0, 0, 0));
    });
    c3.onChange(() => {
      this._webGL._camera.lookAt(new THREE.Vector3(0, 0, 0));
    });
  }

  /**
   * Create Stats with params specified in the config files
   */
  createStats() {
    if (!CONFIG.DEBUG) return;

    this._stats = new Stats();
    this._stats.setMode(CONFIG.STATS.STATS_MODE);

    this._stats.domElement.style.display  = CONFIG.DEBUG ? 'block' : 'none';
    this._stats.domElement.style.position = CONFIG.STATS.STATS_STYLE.position;
    this._stats.domElement.style.top      = CONFIG.STATS.STATS_STYLE.top;
    this._stats.domElement.style.left     = CONFIG.STATS.STATS_STYLE.left;

    document.body.appendChild(this._stats.domElement);
  }

  loadSounds() {
    this._soundsManager.load();
  }

  /**
   * Add events listeners
   */
  addEventListener() {
    this.eeOnce('loading-scenes-end', () => {
      this.loadSounds();
    });

    this.eeListen('loading-sounds-progress', (percentage) => {
      this._hud.loadingPercentage = percentage;
    });

    this.eeOnce('loading-sounds-end', () => {
      setTimeout(() => {
        this._hud.loadingPercentage = 100;
        this._hud.isLoading         = false;

        this._soundsManager.playLoop('bgm');

        this.render();
      }, 1000);
    });

    this.eeOnce('hud-intro-leave', () => {
      this.displayThreeJS(true);
    });

    this.eeListen('redisplay-threejs', () => {
      this.displayThreeJS(false);
    });

    this.eeListen('next-scene', this.nextScene);
  }

  displayThreeJS(init) {
    const el = document.getElementById('main');
    const tl = new TimelineLite({
      paused    : true,
      onComplete: () => {
        this.eeEmit('scene-displayed');
      },
    });

    tl.fromTo(el, 1, { opacity: 0 }, { opacity: 1 });

    tl.play();

    if (init) {
      this._webGL._controls.connect();
    }
  }

  nextScene() {
    // First hide ThreeJS canvas
    const el = document.getElementById('main');
    const tl = new TimelineLite({
      paused: true,
    });

    tl.fromTo(el, 1, { opacity: 1 }, { opacity: 0 });

    tl.play();

    // Next scene
    setTimeout(() => {
      this._webGL.scenesController.nextScene();
    }, 1100);
  }

  /**
   * Render the WebGL scene
   */
  render() {
    if (CONFIG.DEBUG) {
      this._stats.begin();
    }

    this._webGL.update();

    if (CONFIG.DEBUG) {
      this._stats.end();
    }

    requestAnimationFrame(this.render.bind(this));
  }
}

export default App;
