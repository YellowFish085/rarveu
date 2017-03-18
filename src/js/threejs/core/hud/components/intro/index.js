'use strict';

require('./transition');

import Vue          from 'vue/dist/vue';

import EventEmitter from '../../../../classes/EventEmitter';

const template = eval(`\`${require('./template.html')}\``);

const Intro = Vue.extend({
  template,
});

export default Intro;
