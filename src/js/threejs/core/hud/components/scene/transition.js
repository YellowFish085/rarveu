'use strict';

import Vue from 'vue/dist/vue';
import { TimelineMax } from 'gsap';

export default Vue.component('scene-transition', {
	functional: true,
	render: function(createElement, context) {
		var data = {
			props: {
				name: 'scene-transition',
				mode: 'out-in'
			},
			on: {
				enter: function(el, done) {
					let tl = new TimelineMax({
						paused: true,
						onComplete: function() {
							done();
						}
					});

					tl.fromTo(el, 1, { 'opacity': 0	}, { 'opacity': 1 }, '-=0');
					tl.play();
				},
				leave: function(el, done) {
					let tl = new TimelineMax({
						paused: true,
						onComplete: function() {
							done();
						}
					});

					tl.fromTo(el, 1, { 'opacity': 1	}, { 'opacity': 0 }, '-=0');
					tl.play();
				}
			}
		}

		return createElement('transition', data, context.children);
	}
});