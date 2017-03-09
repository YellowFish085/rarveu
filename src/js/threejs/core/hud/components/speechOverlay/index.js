'use strict';

import Vue from 'vue/dist/vue';

require('./transition');

const template = eval(`\`${require('./template.html')}\``);

const SpeechOverlay = Vue.extend({
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
    const wrapper = document.getElementById('hud-speech-overlay-content');
    console.log(wrapper);
    console.log(this.text);

    if (this.text == 'FIRE') {
      wrapper.className = 'fire';
    }
    else if (this.text == 'THUNDER') {
      wrapper.className = 'thunder';
    }
    else if (this.text == 'WATER') {
      wrapper.className = 'water';
    }
    else if (this.text == 'WIND') {
      wrapper.className = 'wind';
    }
  }
});

export default SpeechOverlay;
