'use strict';

require('./transition');

import CONFIG from '../../../config';

import Vue from 'vue/dist/vue';

import Tree from './tree';

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
      treeDatas: null,
    };
  },

  components: {
    tree: Tree,
  },

  created() {
    this.treeDatas = this.formatTreeDatas(CONFIG, 'CONFIG');
  },

  methods: {
    formatTreeDatas(obj, name) {
      if (typeof obj === 'object' && obj !== null) {
        // key has multiple children
        const children = [];

        for (const key in obj) {
          if (obj[key]) {
            children.push(this.formatTreeDatas(obj[key], key));
          }
        }

        return {
          name,
          children,
        };
      }
      else {
        // key don't have children
        return {
          name,
          value: obj,
        };
      }
    },
  },
});

export default Loader;
