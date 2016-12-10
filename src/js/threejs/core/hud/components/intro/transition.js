'use strict';

import Vue              from 'vue/dist/vue';
import { TimelineLite } from 'gsap';

import EventEmitter     from '../../../../classes/EventEmitter';

const eventEmitter = new EventEmitter();

export default Vue.component('intro-transition', {
  functional: true,
  render(createElement, context) {
    const data = {
      props: {
        name: 'intro-transition',
        mode: 'out-in',
      },

      on: {
        enter(el, done) {
          const tl = new TimelineLite({
            paused: true,
            onComplete() {
              done();
            },
          });

          tl.fromTo(el, 2, { opacity: 0 }, { opacity: 1 }, '-=0');

          eventEmitter.eeOnce('hud-loader-leave', () => {
            tl.play();
          });
        },

        leave(el, done) {
          const tl = new TimelineLite({
            paused: true,
            onComplete() {
              eventEmitter.eeEmit('hud-intro-leave');
              done();
            },
          });

          tl.fromTo(el, 1, { opacity: 1 }, { opacity: 0 }, '-=0');
          tl.play();
        },
      },
    };

    return createElement('transition', data, context.children);
  },
});
