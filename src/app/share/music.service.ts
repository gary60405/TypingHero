import { Injectable } from '@angular/core';

@Injectable()
export class MusicService {

  constructor() { }
  public isMuted = false;
  public bgMusic = new Audio('assets/mary_lamb.mp3');
  public dieMusic = new Audio('assets/swoosh.wav');
  public failMusic = new Audio('assets/fail.mp3');


  toggleMute() {
    this.isMuted = !this.isMuted;
  }

  setBgMusic(option: string) {
    if (this.isMuted === false) {
      switch (option) {
        case 'play':
          this.bgMusic.play();
          this.bgMusic.loop = true;
          break;
        case 'pause':
          this.bgMusic.pause();
          break;
        case 'reset':
          this.bgMusic.currentTime = 0;
          break;
        case 'replay':
          this.bgMusic.currentTime = 0;
          this.bgMusic.play();
          break;
        case 'stop':
          this.bgMusic.currentTime = 0;
          this.bgMusic.pause();
          break;
      }
    }
  }
  setDieMusic(option: string) {
    if (this.isMuted === false) {
      switch (option) {
        case 'play':
          this.dieMusic.currentTime = 0;
          this.dieMusic.play();
          break;
        case 'pause':
          this.dieMusic.pause();
          break;
      }
    }
  }
  setFailMusic(option: string) {
    if (this.isMuted === false) {
      switch (option) {
        case 'play':
          this.failMusic.play();
          break;
        case 'pause':
          this.failMusic.pause();
          break;
        case 'replay':
          this.failMusic.currentTime = 0;
          this.failMusic.play();
          break;
      }
    }
  }
}
