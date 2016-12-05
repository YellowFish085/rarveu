'use strict';

import Vue          from 'vue/dist/vue';

import EventEmitter from '../../../../classes/EventEmitter';
const eventEmitter = new EventEmitter();

require('./transition');

const template = eval(`\`${require('./template.html')}\``);

const Intro = Vue.extend({
  template,
});

export default Intro;
