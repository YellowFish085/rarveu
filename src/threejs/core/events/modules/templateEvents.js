/**
 * Template for Events Modules
 * If you want to add a module to the Events System, juste create a module in the 'modules' directory based on this template and add it to the modules list.
 * The only two methods required are the constructor and the 'init' method.
 * You can use the base class 'Event' which implement the EventListener module used to communicate with the WebGL app.
 */
'use strict';

class TemplateEvents {
	constructor() {

	}

	/**
	 * Will be called when Events system is initialized.
	 * Init what's necessary here.
	 */
	init() {

	}
}

export default TemplateEvents;

/*

// Example class

'use strict';

import Event from '../extends/event';

class KeyboardEvent extends Event {
	constructor() {
		super()
	}

	init() {
		this.addEventListener();

		// Listen to an event with Events Emitter
		this.eeListen('AnEvent', myCallback.bind(this));
	}

	myCallback() {
		console.log('Hey !');

		// Remove an event listener
		this.eeRemove('AnEvent', myCallback.bind(this));
	}

	addEventListener() {
		window.addEventListener('keydown', this.onKeyDown);
	}

	onKeyDown(e) {
		var key = e.keyCode;

		console.log(key + ' down');

		// Emit an event with Events Emitter
		this.eeEmit('keydown');
	}
}

export default KeyboardEvent;
*/
