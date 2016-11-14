'use strict';

import Vue             from 'vue/dist/vue';
import { TimeLineLite } from 'gsap';

export default Vue.component('loader-transition', {
	functional: true,
	render: function(createElement, context) {
		var data = {
			props: {
				name: 'loader-transition',
				mode: 'out-in'
			},
			on: {
				enter: function(el, done) {
					let tl = new TimeLineLite({
						paused: true,
						onComplete: function() {
							done();
						}
					});

					tl.fromTo(el, 1, { 'opacity': 0	}, { 'opacity': 1 }, '-=0');
					tl.play();
				},
				leave: function(el, done) {
					let tl = new TimeLineLite({
						paused: true,
						onComplete: function() {
							done();
						}
					});

					tl.fromTo(el, .5, { 'opacity': 1	}, { 'opacity': 0 }, '-=0');
					tl.play();
				}
			}
		}

		return createElement('transition', data, context.children);
	}
});