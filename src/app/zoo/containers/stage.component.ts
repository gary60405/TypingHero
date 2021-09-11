import { Subscription, Observable } from 'rxjs';
import { Animal, ZooConfiguration } from './../../zoo/models';
import { Component, OnInit, OnDestroy, Renderer2 } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { zooConfiguration } from './../../config';
import { ZooService } from '../services/zoo.service';
import { Store } from '@ngrx/store';

import * as fromZoo from '../reducers';
import { StageActions } from '../actions';

@Component({
  selector: 'app-stage',
  templateUrl: `templates/stage.component.html`,
  styleUrls: ['css/stage.component.css']
})
export class StageComponent implements OnInit, OnDestroy {

  animals$: Observable<Animal[]>;
  score$: Observable<number>;
  gameState$: Observable<string>;

  constructor(private zooService: ZooService,
              private zooStore: Store<fromZoo.State>,
              private renderer2: Renderer2) {
    this.gameState$ = this.zooStore.select(fromZoo.selectGameState);
  }
  config: ZooConfiguration = zooConfiguration;
  nameForm: FormGroup;
  hadError = false;
  hadSuccess = true;

  // keyCode: string;
  // score: number;
  // animalArray: Animal[];
  // scoreSubscription: Subscription;
  // displaySubscription: Subscription;
  // animalSubscription: Subscription;
  // errorMsg: Message[] = [{severity: 'error', summary: '不合法的名字', detail: '名字只能輸入中、英文或數字'}];
  // successMsg: Message[] = [{severity: 'success', summary: '合法的名字', detail: '這個名字可以使用！'}];
  keyDownUnlistener: any;
  keyUpUnlistener: any;

  ngOnInit() {
      // this.nameForm = new FormGroup({
      //   name: new FormControl('無名英雄', [Validators.required, Validators.pattern('^[\u4e00-\u9fa5_a-zA-Z0-9]+$')])
      // });
      // this.score = this.zooService.score;
      // this.isDie = this.zooService.isDie;
      // this.animalArray = this.animalService.animalArray;
      // this.animalSubscription = this.animalService.animalSubject
      //   .subscribe(animal => {
      //       if (animal.code === '' && animal.text === '') {
      //         this.animalArray = [];
      //       } else {
      //         this.animalArray.push(animal);
      //       }
      //     }
      // );
      // this.displaySubscription = this.zooService.displaySubject
      //   .subscribe(display => {
      //       this.display = display;
      //       if (this.display === true && this.zooService.gameoverScore > 0 && this.zooService.gameoverScore !== undefined) {
      //         this.zooService.saveToFirebase()
      //           .subscribe();
      //       }
      //     }
      //   );
      // this.scoreSubscription = this.zooService.scoreSubject
      //   .subscribe(score => {
      //     if (score === 0) {
      //       this.score = score;
      //     } else {
      //       this.zooService.gameoverScore = score;
      //       this.score = score;
      //     }
      //   });

      // this.keyDown = e => {

      // };
      // this.keyUp = e => this.isDie = true;
      this.keyDownUnlistener = this.renderer2.listen('document', 'keydown', e => {
        // let j = this.animalService.animalArray.length;
        // let isSameCode: boolean;
        // while (j--) {
        //   isSameCode = (e.keyCode === Number(this.animalService.animalArray[j].code));
        //   const isDie = this.animalService.animalArray[j].die;
        //   if (isSameCode && !isDie && this.isDie) {
        //     this.musicService.setDieMusic('play');
        //     this.animalService.animalArray[j].die = true;
        //     this.isDie = false;
        //     this.keyCode = this.animalService.animalArray[j].code;
        //     this.zooService.score += 100;
        //     this.zooService.scoreSubject.next(this.zooService.score);
        //   }
        // }
        // if (!isSameCode && this.isDie)  {
        //   this.isDie = false;
        //   this.zooService.score > 0 ? this.zooService.score -= 50 : this.zooService.score = 0;
        //   this.zooService.scoreSubject.next(this.zooService.score);
        // }
      });
      this.keyUpUnlistener = this.renderer2.listen('document', 'keyup',  e => this.zooStore.dispatch(StageActions.setGameState({gameState: 'DIE'})));
  }

  generateAnimal(textType: string) {
    const codeIdxList = this.zooService.getRandomArray(0, 25, this.config.animalNumber);
    const nameIdxList = this.zooService.getRandomArray(-1, 6, this.config.animalNumber);
    const scaleIdxList = this.zooService.getRandomArray(-1, 6, this.config.animalNumber);
    const leftList = this.zooService.getRandomArray(15, 70, this.config.animalNumber);
    const topList = this.zooService.getRandomArray(40, 60, this.config.animalNumber);

    for (let idx = 0; idx < this.config.animalNumber; idx++) {
      const animal: Animal = {
        code: this.config.keyCodeMap[codeIdxList[idx]].code,
        text: {
          underText: this.config.keyCodeMap[codeIdxList[idx]].underText,
          upperText: this.config.keyCodeMap[codeIdxList[idx]].upperText,
          tsText: this.config.keyCodeMap[codeIdxList[idx]].tsText,
        }[textType],
        name: this.config.animalName[nameIdxList[idx]],
        isDie: false,
        property: {
          'left.%': leftList[idx],
          'top.%': topList[idx],
          scale: this.config.scalelist[scaleIdxList[idx]],
          'z-index': -100
        }
      };
      this.zooStore.dispatch(StageActions.appendAnimalToList({ animal }));
    }
  }

  onFormChange() {
    // if (!this.nameForm.get('name').valid && this.nameForm.get('name').dirty) {
    //   this.hadError = true;
    //   this.hadSuccess = true;
    // } else {
    //   if (this.hadSuccess && this.hadError) {
    //     this.successMsg = [];
    //     this.successMsg.push({severity: 'success', summary: '合法的名字', detail: '這個名字可以使用！'});
    //     this.hadSuccess = false;
    //   }
    // }
  }

  onStart() {
    // if (this.nameForm.value.name !== null) {
    //   this.zooService.name = this.nameForm.value.name;
    // }
    // this.display = false;
    // this.zooService.score = 0;
    // this.musicService.setBgMusic('reset');
    // if (this.zooService.isFirst) {
    //   setTimeout(() => this.musicService.setBgMusic('play'), 1300);
    //   this.zooService.isFirst = false;
    // } else {
    //   this.musicService.setBgMusic('play');
    // }
    // this.stageService.start();
  }

  ngOnDestroy() {
    this.keyUpUnlistener();
    this.keyDownUnlistener();
    // this.scoreSubscription.unsubscribe();
    // this.displaySubscription.unsubscribe();
    // this.animalSubscription.unsubscribe();
  }


}


