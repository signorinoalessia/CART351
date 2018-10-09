/*** class for sound inspired and copy-lefted from::
https://css-tricks.com/introduction-web-audio-api/*/
canvas = document.getElementById("testCanvas");
context = canvas.getContext("2d");
audioContext = new (window.AudioContext || window.webkitAudioContext)();

function Sound () {
  this.context = audioContext;
  this.offsetDuration =0;

  // init oscillator
  this.init =function () {
    this.oscillator = this.context.createOscillator();
    //connecting oscillator to gainNode to speakers
    this.gainNode = this.context.createGain();
    this.oscillator.connect(this.gainNode);
    this.gainNode.connect(this.context.destination);
    this.oscillator.type = 'sawtooth';
  }

  // initialize properties for biquad filter
  this.filterInit = function() {
  //  this.oscillator = this.context.createOscillator();
    this.biquadFilter = this.context.createBiquadFilter();
    this.oscillator.connect(this.biquadFilter);
    this.biquadFilter.connect(this.gainNode);
    this.biquadFilter.type = 'lowpass';
    this.biquadFilter.frequency.setValueAtTime(1000, this.context.currentTime);
    this.biquadFilter.gain.setValueAtTime(25, this.context.currentTime);
  }

  this.play = function (value, time) {
    this.init();
    // console.log(value);
    this.oscillator.frequency.value = value;
    //set gain
    this.gainNode.gain.setValueAtTime(1, this.context.currentTime);
    this.oscillator.start(time);
    // How LONG should duration of note be?
    this.stop(time+this.offsetDuration);
  }

  this.stop = function(time) {
    // gradual change in value
    this.gainNode.gain.exponentialRampToValueAtTime(0.001, time + 1);
    // this.biquadFilter.stop(time+0);
    this.oscillator.stop(time + 0);
  }

  this.filterPlay = function (value,time) {
    // console.log("inside filterPlay");
    this.filterInit();
    this.biquadFilter.frequency.value = value;
    this.biquadFilter.frequency.setValueAtTime(1, this.context.currentTime);
    console.log("SABINE:: "+this.biquadFilter.frequency.value);
    this.stop(time+this.offsetDuration);
  }

}   //end Sound object
