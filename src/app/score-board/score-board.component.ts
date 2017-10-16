import { Component, OnInit, OnDestroy } from '@angular/core';
import {SelectItem} from 'primeng/primeng';
import { AngularFireDatabase, AngularFireObject, AngularFireList } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { Subscription } from 'rxjs/Subscription';
import * as firebase from 'firebase/app';
import { DatetimeService } from '../share/datetime.service';

@Component({
  selector: 'app-score-board',
  templateUrl: './score-board.component.html',
  styleUrls: ['./score-board.component.css']
})
export class ScoreBoardComponent implements OnInit, OnDestroy {
  itemRef: AngularFireList<any>;
  items: Observable<any>;
  rows = [];
  ranking: SelectItem[];
  rankingSubject = new Subject<string>();
  selectedRanking: string;
  itemSubscription: Subscription;
  constructor(private db: AngularFireDatabase,
              private datetimeService: DatetimeService) {
    this.ranking = [];
    this.ranking.push({label: '歷史排行', value: '歷史排行'});
    this.ranking.push({label: '本月排行', value: '本月排行'});
    this.ranking.push({label: '本日排行', value: '本日排行'});
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

  ngOnDestroy () {
    this.itemSubscription.unsubscribe();
  }
}
