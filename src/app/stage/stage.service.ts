import { Subject, Subscription } from 'rxjs';
import { Injectable } from '@angular/core';

import { AnimalService } from './../share/animal.service';
import { ShareService } from './../share/share.service';
import { MusicService } from '../share/music.service';

@Injectable()
export class StageService {
  constructor(private shareService: ShareService,
              private musicService: MusicService,
              private animalService: AnimalService) {}


  private gameTime = 2000;
  private maxTimeIndex = 3200;
  private minTimeIndex = 1500;
  private subscription: Subscription;

  public mainTimer: any;
  public randomTimer: any;
  public timerSubject = new Subject<any>();



  start() {
    this.gameTime = 2000;
    this.maxTimeIndex = 3200;
    this.minTimeIndex = 1500;
    this.shareService.displaySubject.next(false);
    this.shareService.isStart = true;
    this.animalService.animalArray = [];
    this.musicService.setBgMusic('replay');
    this.animalService.animalInfo = this.animalService.generateAnimal(this.shareService.select);
    let k = this.animalService.animalInfo.length - 1;
    const main = () => {
      this.animalService.animalSubject.next(this.animalService.animalInfo[k]);
      let i = this.animalService.animalArray.length - 1;
      while (i >= 0) {
        if (this.animalService.animalArray[i].die === true) {
          this.animalService.animalArray.splice(i, 1);
        }
        i--;
      }

      if (k === 0) {
        this.animalService.animalInfo = this.animalService.generateAnimal(this.shareService.select);
        k = this.animalService.animalInfo.length - 1;
      } else {
        k--;
      }

      if (this.animalService.animalArray.length >= 20) {
        this.timerSubject.next('random');
        this.gameOver();
      }
    };

    this.mainTimer = setInterval(main, this.gameTime);
    this.subscription = this.animalService.animalSubject
      .subscribe(animal => {
          if (animal.code === '' && animal.text === '') {
            this.animalService.animalArray = [];
            this.subscription.unsubscribe();
          } else {
            this.animalService.animalArray.push(animal);
          }
        }
    );
    let count = 1;
    this.randomTimer = setInterval(() => {
        if (this.shareService.score % 2000 !== 0 && Math.floor(this.shareService.score / 1000) === count) {
          this.minTimeIndex = Math.floor(this.minTimeIndex * 0.9);
          this.maxTimeIndex =  Math.floor(this.maxTimeIndex * 0.85);
        }
        this.timerSubject.next('main');
        if (this.maxTimeIndex > 400) {
          this.gameTime = this.shareService.getRandomArray(this.minTimeIndex, this.maxTimeIndex, 1)[0];
        } else {
          this.gameTime = 350;
        }
        this.mainTimer = setInterval(main, this.gameTime);
        Math.floor(this.shareService.score / 1000) === count ? count++ : count += 0;
      },
    3200);
  }



  gameOver() {
    this.animalService.animalArray = [];
    this.shareService.displaySubject.next(true);
    this.shareService.score = 0;
    this.musicService.setBgMusic('pause');
    this.musicService.setFailMusic('play');
    this.timerSubject.next('all');
    this.shareService.scoreSubject.next(this.shareService.score);
    this.animalService.animalSubject.next(this.animalService.animalStop);
  }
}
