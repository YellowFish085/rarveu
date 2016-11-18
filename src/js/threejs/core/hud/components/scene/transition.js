'use strict';

import Vue             from 'vue/dist/vue';
import { TimelineLite } from 'gsap';

export default Vue.component('scene-transition', {
  functional: true,
  render(createElement, context) {
    const data = {
      props: {
        name: 'scene-transition',
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

          tl.delay(.5)
            .fromTo(el, 1, { opacity: 0  }, { opacity: 1 }, '-=0');
          tl.play();
        },
        leave(el, done) {
          const tl = new TimelineLite({
            paused: true,
            onComplete() {
              done();
            },
          });

          tl.fromTo(el, 1, { opacity: 1  }, { opacity: 0 }, '-=0');
          tl.play();
        },
      },
    };

    return createElement('transition', data, context.children);
  },
});
