/**
 * HOW TO USE
 * import modules from './modules' directory with
 * "import ModuleName from './modules/fileName';"
 * then add 'ModuleName' to the 'modules' list.
 */
'use strict';

import MouseEvents from './modules/mouseEvents';
import KeyboardEvents from './modules/keyboardEvents';

var modules = [
	MouseEvents,
	KeyboardEvents
];

export default modules;

