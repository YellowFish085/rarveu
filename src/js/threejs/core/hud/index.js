'use strict';

import Vue    from 'vue/dist/vue';

import CONFIG from '../config';

import Loader from './components/loader';
import Debug  from './components/debug';
import Intro  from './components/intro';

import Log          from '../../utils/log';
import EventEmitter from '../../classes/EventEmitter';
const eventEmitter = new EventEmitter();

const template = eval(`\`${require('./template.html')}\``);

const App = Vue.extend({
  template,

  data: function data() {
    return {
      isLoading        : true,
      loadingPercentage: 0,
      scenes           : null,
      currentSceneId   : 0,
      showIntro        : true,
    };
  },

  components: {
    loader: Loader,
    debug : Debug,
    intro : Intro,
  },

  mounted() {
    this.bind();

    this.addEventListener();
  },

  methods: {
    bind() {
      this.addIntroEventListener = this.addIntroEventListener.bind(this);
      this.handleCloseIntro      = this.handleCloseIntro.bind(this);
    },

    addEventListener() {
      eventEmitter.eeOnce('hud-loader-leave', this.addIntroEventListener)
      eventEmitter.eeListen('scene-changed', (datas) => {
        this.currentSceneId = datas.currentSceneId;
        this.scenes         = datas.scenes;
      });
    },

    addIntroEventListener() {
      if (CONFIG.DEBUG) {
        eventEmitter.eeOnce('mouseclick', this.handleCloseIntro);
      }

      eventEmitter.eeOnce('speech-play', this.handleCloseIntro);
    },

    handleCloseIntro() {
      this.showIntro = false;
    }
  }
});

export default App;
