'use strict';

import Vue from 'vue/dist/vue';

require('./transition');

let template = eval("`" + require('./template.html') + "`");

var Loader = Vue.extend({
	template: template,

	props: {
		id: {
			type: Number,
			required: true
		}
	}
});

export default Loader;