'use strict';

import Vue    from 'vue/dist/vue';

import Loader from './components/loader';
import Scene  from './components/scene';

const template = eval(`\`${require('./template.html')}\``);

const App = Vue.extend({
  template,

  data: function data() {
    return {
      isLoading        : true,
      loadingPercentage: 0,
      sceneId          : 0,
    };
  },

  components: {
    loader: Loader,
    scene : Scene,
  },
});

export default App;
