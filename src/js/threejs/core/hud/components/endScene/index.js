'use strict';

import Vue from 'vue/dist/vue';

require('./transition');

const template = eval(`\`${require('./template.html')}\``);

const endScene = Vue.extend({
  template,

  props: {
    text: {
      type    : String,
      required: true,
    },
  },

  mounted() {

  },
});

export default endScene;
