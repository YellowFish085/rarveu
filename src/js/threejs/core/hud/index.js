'use strict';

import Vue    from 'vue/dist/vue';

import CONFIG from '../config';

import Loader        from './components/loader';
import Debug         from './components/debug';
import Intro         from './components/intro';
import SpeechOverlay from './components/speechOverlay';

import Log          from '../../utils/log';
import EventEmitter from '../../classes/EventEmitter';

const eventEmitter = new EventEmitter();
const template     = eval(`\`${require('./template.html')}\``);

const App = Vue.extend({
  template,

  data: function data() {
    return {
      debug            : CONFIG.DEBUG,
      isLoading        : true,
      loadingPercentage: 0,
      scenes           : null,
      currentSceneId   : 0,
      showIntro        : true,
      speechOverlayVisible: false,
      speechOverlayText: '',
    };
  },

  components: {
    loader: Loader,
    debug : Debug,
    intro : Intro,
    'speech-overlay': SpeechOverlay,
  },

  mounted() {
    this.bind();

    this.addEventListener();
  },

  methods: {
    bind() {
      this.addIntroEventListener = this.addIntroEventListener.bind(this);
      this.handleCloseIntro      = this.handleCloseIntro.bind(this);
      this.handleSpeech          = this.handleSpeech.bind(this);
    },

    addEventListener() {
      eventEmitter.eeOnce('hud-loader-leave', this.addIntroEventListener);
      eventEmitter.eeListen('scene-changed', (datas) => {
        this.currentSceneId = datas.currentSceneId;
        this.scenes         = datas.scenes;
      });
    },

    addIntroEventListener() {
      eventEmitter.eeOnce('speech-play', this.handleCloseIntro);

      eventEmitter.eeListen('speech-fire', () => {
        this.handleSpeech('FIRE');
      });
      eventEmitter.eeListen('speech-thunder', () => {
        this.handleSpeech('THUNDER');
      });
      eventEmitter.eeListen('speech-water', () => {
        this.handleSpeech('WATER');
      });
      eventEmitter.eeListen('speech-wind', () => {
        this.handleSpeech('WIND');
      });
    },

    handleCloseIntro() {
      this.showIntro = false;
    },

    handleSpeech(txt) {
      this.speechOverlayText    = txt;
      this.speechOverlayVisible = true;

      setTimeout(function() {
        this.speechOverlayVisible = false;
      }.bind(this), 2000)
    }
  },
});

export default App;
