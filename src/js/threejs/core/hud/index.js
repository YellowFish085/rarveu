'use strict';

import Vue from 'vue/dist/vue';

import Loader from './components/loader';
import Scene from './components/scene';

let template = eval("`" + require('./template.html') + "`");

// App
var App = Vue.extend({
	template: template,

	data: function data() {
		return {
			isLoading: true,
			loadingPercentage: 0,
			sceneId: 0
		};
	},

	components: {
		'loader': Loader,
		'scene': Scene
	},

	created: function created() {
		console.log('HUD created');
	},

	mounted: function mounted() {
		console.log('HUD mounted');
	},

	methods: {
		
	}
});

export default App;