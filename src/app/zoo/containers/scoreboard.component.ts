import { Component, OnInit, OnDestroy } from '@angular/core';
import { AngularFireDatabase, AngularFireList  } from '@angular/fire/database';
import { Observable, Subscription, Subject } from 'rxjs';
import { DatetimeService } from '../../share/datetime.service';

@Component({
  selector: 'app-score-board',
  template: `
      <!-- <p-selectButton id="rank"
                      [options]="ranking"
                      [(ngModel)]="selectedRanking"
                      (onChange)="change()"></p-selectButton>

      <table id="table" class="table table-hover table-inverse">
          <thead>
            <tr>
              <th>名次</th>
              <th>名稱</th>
              <th>得分</th>
            </tr>
          </thead>
          <tbody>
            <tr *ngFor="let row of rows;let i = index">
              <th scope="row" *ngIf="row.name!='-'">{{i+1}}</th>
              <th scope="row" *ngIf="row.name=='-'">-</th>
              <td>{{row.name}}</td>
              <td pTooltip="{{row.time != '-' ? (row.time | date:'y/MM/dd HH:mm:ss') : ''}}">{{row.score}}</td>
            </tr>
          </tbody>
      </table> -->
  `,
  styles: [``]
})
export class ScoreBoardComponent implements OnInit, OnDestroy {
  itemRef: AngularFireList<any>;
  items: Observable<any>;
  rows = [];
  // ranking: SelectItem[];
  rankingSubject = new Subject<string>();
  selectedRanking: string;
  itemSubscription: Subscription;
  constructor(private db: AngularFireDatabase,
              private datetimeService: DatetimeService) {
    // this.ranking = [];
    // this.ranking.push({label: '歷史排行', value: '歷史排行'});
    // this.ranking.push({label: '本月排行', value: '本月排行'});
    // this.ranking.push({label: '本日排行', value: '本日排行'});
  }

  ngOnInit() {
    this.selectedRanking = '歷史排行';
    this.fetchFromFirebase('year');
  }

  fetchFromFirebase(datetime: string) {
    const date = this.datetimeService.formateDateTime(datetime);
    if (datetime === 'year') {
      this.itemRef = this.db.list('/data', ref => ref.orderByChild('score').endAt(50000).limitToLast(100));
    } else {
      this.itemRef = this.db.list('/data', ref => ref.orderByChild('time').startAt(date));
    }
    this.items = this.itemRef.valueChanges();
    this.itemSubscription = this.items
      .subscribe(item => {
          let i = item.length - 1;
          while (i-- ) {
            item[i].score === undefined ? item.splice(i, 1) : i = i ;
          }
          item.sort((a, b) => {
            return b.score - a.score;
          });
          this.rows = item.slice(0, 100);
        }
      );
  }

  change() {
    this.rows = [{name: '-', score: '-', time: '-'}];
    switch (this.selectedRanking) {
      case '本日排行':
        this.fetchFromFirebase('day');
        break;
      case '本月排行':
        this.fetchFromFirebase('month');
        break;
      case '歷史排行':
        this.fetchFromFirebase('year');
        break;
    }
  }

  ngOnDestroy() {
    this.itemSubscription.unsubscribe();
  }
}
