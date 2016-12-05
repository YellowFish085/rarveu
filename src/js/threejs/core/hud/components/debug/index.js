'use strict';

import CONFIG from '../../../config';

import Vue from 'vue/dist/vue';

import Tree from './tree';

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
      if (typeof obj === "object" && obj !== null) {
        // key has multiple children
        let children = [];

        for (var key in obj) {
          children.push(this.formatTreeDatas(obj[key], key));
        }

        return {
          name: name,
          children: children,
        };
      }
      else {
        // key don't have children
        return {
          name: name,
          value: obj,
        };
      }
    }
  }
});

export default Loader;
