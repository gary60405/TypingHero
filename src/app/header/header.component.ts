import { AnimalService } from './../share/animal.service';
import { Property } from './../stage/css.model';
import { StageService } from './../stage/stage.service';
import { Component, OnInit, Input } from '@angular/core';
import { Animal } from '../stage/stage.model';
import { ShareService } from '../share/share.service';
import { MusicService } from '../share/music.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private stageService: StageService,
              public shareService: ShareService,
              public musicService: MusicService,
              private animalService: AnimalService) { }
  underText = true;
  upperText = false;
  tsText = false;
  scoreBoard = false;

  ngOnInit() {
    this.stageService.timerSubject
      .subscribe(select => {
        switch (select) {
          case 'main':
            this.shareService.unsetTimer(this.stageService.mainTimer);
            break;
          case 'random':
            this.shareService.unsetTimer(this.stageService.randomTimer);
            break;
          case 'all':
            this.shareService.unsetTimer(this.stageService.randomTimer);
            this.shareService.unsetTimer(this.stageService.mainTimer);
            break;
        }
      });
  }

  onChange(selectText: string) {
    this.onSwich(selectText);
    this.shareService.score = 0;
    this.shareService.select = selectText;
    this.shareService.displaySubject.next(false);
    this.shareService.scoreSubject.next(this.shareService.score);
    this.animalService.animalSubject.next(this.animalService.animalStop);
    this.stageService.timerSubject.next('all');
    this.shareService.isFirst ? this.musicService.setBgMusic('reset') : this.stageService.start();
  }

  onScoreBoard(selectText: string) {
    this.stageService.timerSubject.next('all');
    this.musicService.setBgMusic('stop');
    this.onSwich(selectText);
  }

  onSwich(select: string) {
    switch (select) {
      case 'scoreBoard':
        this.scoreBoard = true;
        this.underText = false;
        this.upperText = false;
        this.tsText = false;
        break;
      case 'underText':
        this.scoreBoard = false;
        this.underText = true;
        this.upperText = false;
        this.tsText = false;
        break;
      case 'upperText':
        this.scoreBoard = false;
        this.underText = false;
        this.upperText = true;
        this.tsText = false;
        break;
      case 'tsText':
        this.scoreBoard = false;
        this.underText = false;
        this.upperText = false;
        this.tsText = true;
        break;
    }
  }

  toggleMute() {
    this.musicService.toggleMute();
    if (this.shareService.isStart && !this.musicService.isMuted) {
      this.musicService.setBgMusic('play');
    } else {
      this.musicService.bgMusic.pause();
    }
  }


}
