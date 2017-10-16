import { Subscription } from 'rxjs/Subscription';
import { Animal } from './stage.model';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { StageService } from './stage.service';
import { Subject } from 'rxjs/Subject';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MusicService } from '../share/music.service';
import { ShareService } from '../share/share.service';
import { AnimalService } from '../share/animal.service';
import {Message} from 'primeng/components/common/api';
import {MessageService} from 'primeng/components/common/messageservice';

@Component({
  selector: 'app-stage',
  templateUrl: './stage.component.html',
  styleUrls: ['./stage.component.css']
})
export class StageComponent implements OnInit, OnDestroy {

  constructor(private stageService: StageService,
              public shareService: ShareService,
              private musicService: MusicService,
              private animalService: AnimalService,
              private messageService: MessageService) {}

  keyCode: string;
  score: number;
  animalArray: Animal[];
  display: boolean;
  isStart: boolean;
  isDie: boolean;
  nameForm: FormGroup;
  scoreSubscription: Subscription;
  displaySubscription: Subscription;
  animalSubscription: Subscription;
  displayInfo = false;
  hadError = false;
  hadSuccess = true;
  errorMsg: Message[] = [{severity: 'error', summary: '不合法的名字', detail: '名字只能輸入中、英文或數字'}];
  successMsg: Message[] = [{severity: 'success', summary: '合法的名字', detail: '這個名字可以使用！'}];
  keyDown: any;
  keyUp: any;

    ngOnInit() {
      this.nameForm = new FormGroup({
        name: new FormControl('無名英雄', [Validators.required, Validators.pattern('^[\u4e00-\u9fa5_a-zA-Z0-9]+$')])
      });
      this.score = this.shareService.score;
      this.isDie = this.shareService.isDie;
      this.animalArray = this.animalService.animalArray;
      this.animalSubscription = this.animalService.animalSubject
        .subscribe(animal => {
            if (animal.code === '' && animal.text === '') {
              this.animalArray = [];
            } else {
              this.animalArray.push(animal);
            }
          }
      );
      this.displaySubscription = this.shareService.displaySubject
        .subscribe(display => {
            this.display = display;
            if (this.display === true && this.shareService.gameoverScore > 0 && this.shareService.gameoverScore !== undefined) {
              this.shareService.saveToFirebase()
                .subscribe();
            }
          }
        );
      this.scoreSubscription = this.shareService.scoreSubject
        .subscribe(score => {
          if (score === 0) {
            this.score = score;
          } else {
            this.shareService.gameoverScore = score;
            this.score = score;
          }
        });

      this.keyDown = e => {
        let j = this.animalService.animalArray.length;
        let isSameCode: boolean;
        while (j--) {
          isSameCode = (e.keyCode === Number(this.animalService.animalArray[j].code));
          const isDie = this.animalService.animalArray[j].die;
          if (isSameCode && !isDie && this.isDie) {
            this.musicService.setDieMusic('play');
            this.animalService.animalArray[j].die = true;
            this.isDie = false;
            this.keyCode = this.animalService.animalArray[j].code;
            this.shareService.score += 100;
            console.log(this.shareService.score);
            this.shareService.scoreSubject.next(this.shareService.score);
          }
        }
        if (!isSameCode && this.isDie)  {
          this.isDie = false;
          this.shareService.score > 0 ? this.shareService.score -= 50 : this.shareService.score = 0;
          this.shareService.scoreSubject.next(this.shareService.score);
        }
      };
      this.keyUp = e => this.isDie = true;

      document.addEventListener('keydown', this.keyDown);
      document.addEventListener('keyup', this.keyUp);
  }

  onFormChange() {
    if (!this.nameForm.get('name').valid && this.nameForm.get('name').dirty) {
      this.displayInfo = true;
      this.hadError = true;
      this.hadSuccess = true;
    } else {
      this.displayInfo = false;
      if (this.hadSuccess && this.hadError) {
        this.successMsg = [];
        this.successMsg.push({severity: 'success', summary: '合法的名字', detail: '這個名字可以使用！'});
        this.hadSuccess = false;
      }
    }
  }

  onStart () {
    if (this.nameForm.value.name !== null) {
      this.shareService.name = this.nameForm.value.name;
    }
    this.display = false;
    this.shareService.score = 0;
    this.musicService.setBgMusic('reset');
    if (this.shareService.isFirst) {
      setTimeout(() => this.musicService.setBgMusic('play'), 1300);
      this.shareService.isFirst = false;
    } else {
      this.musicService.setBgMusic('play');
    }
    this.stageService.start();
  }

  ngOnDestroy() {
    document.removeEventListener('keyup', this.keyUp);
    document.removeEventListener('keydown', this.keyDown);
    this.scoreSubscription.unsubscribe();
    this.displaySubscription.unsubscribe();
    this.animalSubscription.unsubscribe();
  }


}


