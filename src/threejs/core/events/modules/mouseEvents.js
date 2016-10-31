'use strict';

import Log from '../../utils/log';

import EventEmitter from '../extends/eventEmitter';

class MouseEvents extends EventEmitter {
	constructor() {
		super();

		this.bind();
	}

	init() {
		this.addEventListener();
	}

	bind() {
		this.onMouseMove = this.onMouseMove.bind(this);
		this.onMouseDown = this.onMouseDown.bind(this);
		this.onMouseUp   = this.onMouseUp.bind(this);
	}

	addEventListener() {
		document.addEventListener('mousemove', this.onMouseMove);
		document.addEventListener('mousedown', this.onMouseDown);
		document.addEventListener('mouseup', this.onMouseUp);
	}

	onMouseMove(e) {
		// Log.trace('mouseMove: ' + e.pageX + ' , ' + e.pageY);
	}

	onMouseDown(e) {
		e.preventDefault();
		e.stopPropagation();

		Log.trace('mouseDown, btn ' + e.button);

		this.eeEmit('mousedown');
	}

	onMouseUp(e) {
		e.preventDefault();
		e.stopPropagation();

		Log.trace('mouseUp, btn ' + e.button);
	}
}

export default MouseEvents;