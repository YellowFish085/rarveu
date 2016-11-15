'use strict';

import domready from 'domready';

import App      from './threejs/app';

domready(() => {
  const app = new App();
});
