import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { LayoutActions } from './../actions';
import * as fromRoot from './../../reducers';
import * as fromZoo from './../../zoo/reducers';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-toolbar',
  template: `
    <!-- <mat-toolbar  color="primary">
      <mat-toolbar-row>
        <button mat-icon-button class="ms-1" >
          <img src="assets/brand.svg" width="40" height="40" class="d-inline-block align-top">
        </button>
        <div class="d-flex justify-content-end align-items-center">
        <div class="username">嗨, {{username$ | async}}</div>

        <mat-button-toggle-group name="option" (change)="onSelectMode($event)">
          <mat-button-toggle value="scoreBoard">排行榜</mat-button-toggle>
          <mat-button-toggle value="underText">小寫</mat-button-toggle>
          <mat-button-toggle value="upperText">大寫</mat-button-toggle>
          <mat-button-toggle value="tsText">注音</mat-button-toggle>
        </mat-button-toggle-group>

        <div *ngIf="(isMute$ | async)" class="music navbar-item isMuted" (click)="setMuteState(true)"></div>
        <div *ngIf="(isMute$ | async) === false" class="music navbar-item notMuted" (click)="setMuteState(false)"></div>
      </div>
      </mat-toolbar-row>
  </mat-toolbar> -->

  <mat-progress-bar *ngIf="loaded$ | async" color="accent" mode="indeterminate"></mat-progress-bar>
  `,
  styles: [
    `
    :host ::ng-deep .mat-progress-bar-fill::after {
      background-color: #20c997 !important;
    }
    .music {
      width: 5vh;
      height: 5vh;
    }

    .notMuted {
      background-image: url('./../../../assets/volume-control.svg');
    }

    .isMuted {
      background-image: url('./../../../assets/mute-audio.svg');
    }

    .username {
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
      font-size: 2rem;
      color: #fff;
    }
    `
  ]
})
export class ToolbarComponent implements OnInit {

  date = new Date();
  loaded$: Observable<boolean>;
  username$: Observable<string>;
  isMute$: Observable<boolean>;

  constructor(private rootStore: Store<fromRoot.State>,
              private router: Router,
              private routes: ActivatedRoute ) {
    this.loaded$ = this.rootStore.select(fromRoot.selectLoaded);
    this.isMute$ = this.rootStore.select(fromRoot.selectMuteState);
    this.username$ = this.rootStore.select(fromRoot.selectUsername);
  }

    ngOnInit() {
      // this.stageService.timerSubject
      //   .subscribe(select => {
      //     switch (select) {
      //       case 'main':
      //         this.shareService.unsetTimer(this.stageService.mainTimer);
      //         break;
      //       case 'random':
      //         this.shareService.unsetTimer(this.stageService.randomTimer);
      //         break;
      //       case 'all':
      //         this.shareService.unsetTimer(this.stageService.randomTimer);
      //         this.shareService.unsetTimer(this.stageService.mainTimer);
      //         break;
      //       }
      //   });
    }

    // onChange(selectText: string) {
    //   this.onSwich(selectText);
    //   this.shareService.score = 0;
    //   this.shareService.select = selectText;
    //   this.shareService.displaySubject.next(false);
    //   this.shareService.scoreSubject.next(this.shareService.score);
    //   this.animalService.animalSubject.next(this.animalService.animalStop);
    //   this.stageService.timerSubject.next('all');
    //   this.shareService.isFirst ? this.musicService.setBgMusic('reset') : this.stageService.start();
    // }

    // onScoreBoard(selectText: string) {
    //   this.stageService.timerSubject.next('all');
    //   this.musicService.setBgMusic('stop');
    //   this.onSwich(selectText);
    // }

    onSelectMode(mode: string) {
      this.rootStore.dispatch(LayoutActions.setMode({ mode }));
      if (mode === 'scoreBoard') {
        this.router.navigate([`scoreBoard`], { relativeTo: this.routes });
      }
    }

    setMuteState(isMute: boolean) {
      this.rootStore.dispatch(LayoutActions.setMuteState({ isMute }));
    }
}
