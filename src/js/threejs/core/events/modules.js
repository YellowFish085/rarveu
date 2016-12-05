/**
 * HOW TO USE
 * import modules from './modules' directory with
 * "import ModuleName from './modules/fileName';"
 * then add 'ModuleName' to the 'modules' list.
 */

'use strict';

import MouseEvents    from './modules/mouseEvents';
import KeyboardEvents from './modules/keyboardEvents';
import SpeechEvents from './modules/speechEvents';

const modules = [
  MouseEvents,
  KeyboardEvents,
  SpeechEvents,
];

export default modules;

