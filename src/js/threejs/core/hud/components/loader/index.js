'use strict';

import Vue from 'vue/dist/vue';

require('./transition');

const template = eval(`\`${require('./template.html')}\``);

const Loader = Vue.extend({
  template,

  props: {
    percentage: {
      type    : Number,
      required: true,
    },
  },

  data() {
    return {
      interval: null,
    };
  },
});

export default Loader;
