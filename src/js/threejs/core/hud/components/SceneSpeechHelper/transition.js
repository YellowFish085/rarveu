'use strict';

import Vue              from 'vue/dist/vue';
import { TimelineLite } from 'gsap';

import EventEmitter     from '../../../../classes/EventEmitter';

const eventEmitter = new EventEmitter();

export default Vue.component('scene-speech-helper-transition', {
  functional: true,
  render(createElement, context) {
    const data = {
      props: {
        name: 'scene-speech-helper-transition',
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

          tl.fromTo(el, 1, { opacity: 0 }, { opacity: 1 }, '-=0');
          tl.play();
        },

        leave(el, done) {
          const tl = new TimelineLite({
            paused: true,
            onComplete() {
              eventEmitter.eeEmit('hud-scene-speech-helper-leave');
              done();
            },
          });

          tl.fromTo(el, 0.5, { opacity: 1 }, { opacity: 0 }, '-=0');
          tl.play();
        },
      },
    };

    return createElement('transition', data, context.children);
  },
});
