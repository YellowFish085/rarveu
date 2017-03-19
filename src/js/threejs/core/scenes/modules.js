/**
 * HOW TO USE
 * import modules from './modules' directory with
 * "import ModuleName from './modules/fileName';"
 * then add 'ModuleName' to the 'modules' list.
 */

'use strict';

import SceneA from './modules/sceneA';
import SceneB from './modules/sceneB';

const modules = [
  SceneA,
  SceneB,
];

export default modules;

