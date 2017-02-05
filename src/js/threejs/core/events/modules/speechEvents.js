'use strict';

import annyang      from 'annyang';

import Log          from '../../../utils/log';

import EventEmitter from '../../../classes/EventEmitter';

class SpeechEvents extends EventEmitter {
  constructor() {
    super();
  }

  init() {
    this.bind();
    this.addEventListener();
    this.initAnnyang();
  }

  bind() {
    this.onResultMatch = this.onResultMatch.bind(this);
    this.startRecording = this.startRecording.bind(this);
  }

  initAnnyang() {
    if (annyang) {
      // eau vent feu foudre

      annyang.setLanguage('en-US');

      annyang.addCallback('result', this.onResult);
      annyang.addCallback('resultMatch', this.onResultMatch);

      const commands = {
        'water'      : this.onSpeech,
        'fire'       : this.onSpeech,
        'electricity': this.onSpeech,
        'wind'       : this.onSpeech,
      };
      annyang.addCommands(commands);
    }
  }

  addEventListener() {
    this.eeListen('startRecording', this.startRecording);
  }

  startRecording() {
    annyang.start({ autoRestart: false, continuous: false });
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
