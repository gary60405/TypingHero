import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { HttpClient, HttpRequest } from '@angular/common/http';
@Injectable()
export class ShareService {

  constructor(private httpClient: HttpClient) { }


  public data = {};
  public name = '無名英雄';
  public score = 0;
  public gameoverScore = 0;
  public scoreSubject = new Subject<number>();
  public displaySubject = new Subject<boolean>();
  public isDie = true;
  public isFirst = true;
  public isStart = false;
  public select = 'underText';

  unsetTimer(timer) {
    clearInterval(timer);
  }

  saveToFirebase() {
    this.data = {};
    this.data['time'] = new Date;
    this.data['name'] = this.name;
    this.data['score'] = this.gameoverScore;
    const req = new HttpRequest('POST', 'https://typinghero-1c004.firebaseio.com/data.json', this.data);
    return this.httpClient.request(req);
  }

  shuffleArray(array) {
    let i = array.length;
    while (i > 0) {
      const j = Math.floor(Math.random() * i);
      [array[i - 1], array[j]] = [array[j], array[i - 1]];
      i--;
    }
    return array;
  }

  getRandomArray(minNum, maxNum, n) {
    let i = maxNum;
    const tempArray = [i];
    const resultArray = [];
    while (i-- && i > minNum) {
      tempArray.push(i);
    }
    this.shuffleArray(tempArray);
    i = n;
    while (i > maxNum) {
      const num = maxNum;
      i -= num;
      resultArray.push(...tempArray.slice());
      this.shuffleArray(tempArray);
    }
    resultArray.push(...tempArray.slice(0, i));
    return resultArray;
  }

}
