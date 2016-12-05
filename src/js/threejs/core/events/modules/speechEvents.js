'use strict';

import annyang      from 'annyang';

import Log          from '../../../utils/log';

import EventEmitter from '../../../classes/EventEmitter';

class SpeechEvents extends EventEmitter {
  constructor() {
    super();
  }

  init() {
    this.initAnnyang();
    this.addEventListener();
  }

  initAnnyang() {
    if (annyang) {
      annyang.setLanguage('en-US');

      annyang.addCallback('result', this.onResult);
      annyang.addCallback('resultMatch', this.onResultMatch);

      const commands = {
        'hello': this.onSpeech,
      };
      annyang.addCommands(commands);

      annyang.start();
    }
  }

  addEventListener() {
    
  }

  onResult(params) {
    Log.trace(params);
  }

  onResultMatch(userSaid, commandText, phrases) {
    console.log(`Matched %c"${userSaid}"`, 'color: blue;');

    this.eeEmit(`speech-${userSaid}`);
  }

  onSpeech(params) {
    Log.trace('Something said and matched...');
  }
}

export default SpeechEvents;
