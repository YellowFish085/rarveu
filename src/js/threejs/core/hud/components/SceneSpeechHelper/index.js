'use strict';

import Vue from 'vue/dist/vue';

require('./transition');

const template = eval(`\`${require('./template.html')}\``);

const SceneSpeechHelper = Vue.extend({
  template,

  props: {
    text: {
      type    : String,
      required: true,
    },
  },

  data() {
    return {
      interval: null,
    };
  },

  mounted() {
    const wrapper = document.getElementById('hud-scene-speech-helper-content');

    if (this.text === 'FIRE') {
      wrapper.className = 'fire';
    }
    else if (this.text === 'THUNDER') {
      wrapper.className = 'thunder';
    }
    else if (this.text === 'WATER') {
      wrapper.className = 'water';
    }
    else if (this.text === 'WIND') {
      wrapper.className = 'wind';
    }
    else if (this.text === 'WIND AND WATER') {
      wrapper.className = 'water';
    }
  },
});

export default SceneSpeechHelper;
