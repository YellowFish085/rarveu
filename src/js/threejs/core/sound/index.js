'use strict';

import 'yuki-createjs';

import EventEmitter from '../../classes/EventEmitter';

class SoundManager extends EventEmitter {
  constructor() {
    super();

    this._soundsFiles    = [];
    this._queue          = null;
    this._playConfigLoop = null;
    this._playConfigOnce = null;

    this.bind();
    this.init();

    this.addEventListener();
  }

  bind() {
    this.handleFileLoad        = this.handleFileLoad.bind(this);
    this.handleComplete        = this.handleComplete.bind(this);
    this.playRandomActionSound = this.playRandomActionSound.bind(this);
  }

  addEventListener() {
    this.eeListen('play-random-action-sound', this.playRandomActionSound);
  }

  init() {
    this._queue = new createjs.LoadQueue();

    createjs.Sound.alternateExtensions = ['mp3'];

    this._queue.installPlugin(createjs.Sound);

    this._queue.addEventListener('progress', this.handleFileLoad);
    this._queue.addEventListener('complete', this.handleComplete);

    this._playConfigLoop = new createjs.PlayPropsConfig().set({
      loop: -1,
    })

    this._playConfigOnce = new createjs.PlayPropsConfig().set({
      loop: 0,
    })

    this.initSoundFilesList();
  }

  initSoundFilesList() {
    this._soundsFiles.push({
      id : 'bgm',
      src: 'assets/sounds/bgm.mp3'
    });

    this._soundsFiles.push({
      id : '01',
      src: 'assets/sounds/01.mp3'
    });
    this._soundsFiles.push({
      id : '02',
      src: 'assets/sounds/02.mp3'
    });
  }

  load() {
    this._queue.loadManifest(this._soundsFiles);
  }

  handleFileLoad(e) {
    this.eeEmit('loading-sounds-progress', parseInt(100 * e.loaded));
  }

  handleComplete(e) {
    this.eeEmit('loading-sounds-end');
  }

  play(id) {
    createjs.Sound.play(id, this._playConfigOnce);
  }

  playLoop(id) {
    createjs.Sound.play(id, this._playConfigLoop);
  }

  playRandomActionSound() {
    const actionSounds = this._soundsFiles.filter((i) => { return i.id !== 'bgm' });
    
    if (actionSounds.length <= 0) return;

    this.play(actionSounds[Math.floor(Math.random() * actionSounds.length)].id);
  }
}

export default SoundManager;