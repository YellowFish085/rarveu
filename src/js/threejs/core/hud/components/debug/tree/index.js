'use strict';

import Vue from 'vue/dist/vue';

const template = eval(`\`${require('./template.html')}\``);

const Tree = Vue.extend({
  template,

  name: 'tree',

  props: {
    model: {
      type: Object,
    },
  },

  data: function () {
    return {
      open: false
    }
  },

  computed: {
    isFolder: function () {
      return this.model.children && this.model.children.length;
    },

    getTdClass() {
      return this.model.children && this.model.children.length ? 'hud-debug-category' : '';
    }
  },

  methods: {
    toggle: function () {
      if (this.isFolder) {
        this.open = !this.open;
      }
    },

    changeType: function () {
      if (!this.isFolder) {
        Vue.set(this.model, 'children', []);
        this.addChild();
        this.open = true;
      }
    },
  }
});

export default Tree;
