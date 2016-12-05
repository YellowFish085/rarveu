'use strict';

import CONFIG from '../../../config';

import Vue from 'vue/dist/vue';

require('./transition');

const template = eval(`\`${require('./template.html')}\``);

const Loader = Vue.extend({
  template,

  props: {
    currentSceneId: {
      type    : Number,
      required: true,
    },
    scenes: {
      type    : Array,
      required: true,
    },
  },

  data: function data() {
    return {
      config: {
        debug: CONFIG.DEBUG,
      },
    };
  },
});

export default Loader;
