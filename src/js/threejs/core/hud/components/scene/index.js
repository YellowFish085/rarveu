'use strict';

import Vue from 'vue/dist/vue';

require('./transition');

let template = eval("`" + require('./template.html') + "`");

// App
var Loader = Vue.extend({
	template: template,

	props: {
		id: {
			type: Number,
			required: true
		}
	},

	data: function data() {
		return {
			
		};
	},

	components: {

	},

	created: function created() {
		console.log('HUD Loader created');
	},

	mounted: function mounted() {
		console.log('HUD Loader mounted');
	},

	update: function update() {
		console.log('HUD Loader update');
	},

	methods: {
		
	}
});

export default Loader;