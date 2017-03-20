'use strict';

import Vue    from 'vue/dist/vue';

import CONFIG from '../config';

import Loader            from './components/loader';
import Debug             from './components/debug';
import Intro             from './components/intro';
import SpeechOverlay     from './components/speechOverlay';
import SceneSpeechHelper from './components/sceneSpeechHelper';
import EndScene          from './components/endScene';

import EventEmitter from '../../classes/EventEmitter';

const eventEmitter = new EventEmitter();
const template     = eval(`\`${require('./template.html')}\``);

const App = Vue.extend({
  template,

  data: function data() {
    return {
      debug                   : CONFIG.DEBUG,
      isLoading               : true,
      loadingPercentage       : 0,
      scenes                  : null,
      currentSceneId          : 0,
      showIntro               : true,
      speechOverlayVisible    : false,
      speechOverlayText       : '',
      sceneSpeechHelperVisible: false,
      sceneSpeechHelperText   : '',
      endSceneVisible         : false,
      endSceneText            : '',
    };
  },

  components: {
    loader               : Loader,
    debug                : Debug,
    intro                : Intro,
    'speech-overlay'     : SpeechOverlay,
    'scene-speech-helper': SceneSpeechHelper,
    'end-scene'          : EndScene,
  },

  mounted() {
    this.bind();

    this.addEventListener();
  },

  methods: {
    bind() {
      this.addIntroEventListener        = this.addIntroEventListener.bind(this);
      this.handleCloseIntro             = this.handleCloseIntro.bind(this);
      this.handleSpeech                 = this.handleSpeech.bind(this);
      this.handleCloseSceneSpeechHelper = this.handleCloseSceneSpeechHelper.bind(this);
      this.handleEndScene               = this.handleEndScene.bind(this);
      this.handleEndGame                = this.handleEndGame.bind(this);
    },

    addEventListener() {
      eventEmitter.eeOnce('hud-loader-leave', this.addIntroEventListener);
      eventEmitter.eeListen('scene-changed', (datas) => {
        this.currentSceneId = datas.currentSceneId;
        this.scenes         = datas.scenes;

        if (!datas.firstCall) {
          this.handleCloseEndScene();
        }
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

      eventEmitter.eeListen('scene-speech-helper-close', this.handleCloseSceneSpeechHelper);

      eventEmitter.eeListen('scene-speech-helper-fire', () => {
        this.handleSceneSpeechHelper('FIRE');
      });
      eventEmitter.eeListen('scene-speech-helper-thunder', () => {
        this.handleSceneSpeechHelper('THUNDER');
      });
      eventEmitter.eeListen('scene-speech-helper-water', () => {
        this.handleSceneSpeechHelper('WATER');
      });
      eventEmitter.eeListen('scene-speech-helper-wind', () => {
        this.handleSceneSpeechHelper('WIND');
      });
      eventEmitter.eeListen('scene-speech-helper-windwater', () => {
        this.handleSceneSpeechHelper('WIND AND WATER');
      });

      eventEmitter.eeListen('scene-completed', this.handleEndScene);
      eventEmitter.eeListen('game-end', this.handleEndGame);
    },

    handleCloseIntro() {
      this.showIntro = false;
    },

    handleSpeech(txt) {
      this.speechOverlayText    = txt;
      this.speechOverlayVisible = true;

      setTimeout(() => {
        this.speechOverlayVisible = false;
      }, 2000);
    },

    handleCloseSceneSpeechHelper() {
      this.sceneSpeechHelperVisible = false;
    },

    handleSceneSpeechHelper(txt) {
      this.sceneSpeechHelperText    = txt;
      this.sceneSpeechHelperVisible = true;
    },

    handleEndScene() {
      this.endSceneText = 'CONGRATULATION';
      this.endSceneVisible = true;

      setTimeout(() => {
        eventEmitter.eeEmit('next-scene');
      }, 2500);
    },

    handleCloseEndScene() {
      this.endSceneVisible = false;

      setTimeout(() => {
        eventEmitter.eeEmit('redisplay-threejs');
      }, 1500);
    },

    handleEndGame() {
      this.endSceneVisible = false;

      setTimeout(() => {
        this.endSceneText    = 'YOU BEAT THE GAME';
        this.endSceneVisible = true;

        eventEmitter.eeRemoveAllListeners();
      }, 1100);
    },
  },
});

export default App;
