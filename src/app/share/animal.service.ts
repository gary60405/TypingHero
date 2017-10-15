import { ShareService } from './share.service';
import { Injectable } from '@angular/core';
import { Animal, Data } from './../stage/stage.model';
import { Property } from './../stage/css.model';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class AnimalService {

  constructor(private shareService: ShareService) { }

  private animals: Animal[] = [];
  private animal: Animal;
  private animalName = ['frog', 'giraffe', 'lion', 'panda', 'pig', 'sheep', 'tiger'];
  private scalelist = [1, 1.4, 1.2, 1.6, 0.6, 0.8, 0.4];

  public animalNumber = 10;
  public animalInfo: Animal[] = [];
  public animalArray: Animal[] = [];
  public animalSubject = new Subject<Animal>();
  public animalStop = new Animal('', '', '', false, new Property(0, 0, 0, -100));
  public dataList: Data[]= [
    new Data('a', 'A', 'ㄇ', '65'),
    new Data('b', 'B', 'ㄖ', '66'),
    new Data('c', 'C', 'ㄏ', '67'),
    new Data('d', 'D', 'ㄎ', '68'),
    new Data('e', 'E', 'ㄍ', '69'),
    new Data('f', 'F', 'ㄑ', '70'),
    new Data('g', 'G', 'ㄕ', '71'),
    new Data('h', 'H', 'ㄘ', '72'),
    new Data('i', 'I', 'ㄛ', '73'),
    new Data('j', 'J', 'ㄨ', '74'),
    new Data('k', 'K', 'ㄜ', '75'),
    new Data('l', 'L', 'ㄠ', '76'),
    new Data('m', 'M', 'ㄩ', '77'),
    new Data('n', 'N', 'ㄙ', '78'),
    new Data('o', 'O', 'ㄟ', '79'),
    new Data('p', 'P', 'ㄣ', '80'),
    new Data('q', 'Q', 'ㄆ', '81'),
    new Data('r', 'R', 'ㄐ', '82'),
    new Data('s', 'S', 'ㄋ', '83'),
    new Data('t', 'T', 'ㄔ', '84'),
    new Data('u', 'U', 'ㄧ', '85'),
    new Data('v', 'V', 'ㄒ', '86'),
    new Data('w', 'W', 'ㄊ', '87'),
    new Data('x', 'X', 'ㄌ', '88'),
    new Data('y', 'Y', 'ㄗ', '89'),
    new Data('z', 'Z', 'ㄈ', '90'),
    new Data('', '', 'ㄅ', '49'),
    new Data('', '', 'ㄉ', '50'),
    new Data('', '', 'ㄝ', '188'),
    new Data('', '', 'ㄡ', '190'),
    new Data('', '', 'ㄥ', '191'),
    new Data('', '', 'ㄤ', '186'),
    new Data('', '', 'ㄦ', '189'),
    new Data('', '', 'ㄓ', '53'),
    new Data('', '', 'ㄚ', '56'),
    new Data('', '', 'ㄞ', '57'),
    new Data('', '', 'ㄢ', '48'),
  ];


  generateAnimal(textType: string) {
    let i = this.animalNumber;
    const code = this.shareService.getRandomArray(0, 25, this.animalNumber);
    const name = this.shareService.getRandomArray(-1, 6, this.animalNumber);
    const scale = this.shareService.getRandomArray(-1, 6, this.animalNumber);
    const left = this.shareService.getRandomArray(15, 70, this.animalNumber);
    const top = this.shareService.getRandomArray(40, 60, this.animalNumber);

    this.animals = [];
    while (i--) {
      this.animal = new Animal('', '', '', false, new Property(0, 0, 0, -100));
      this.animal.code = this.dataList[code[i]].code;
      this.animal.name = this.animalName[name[i]];
      this.animal.text = this.dataList[code[i]].underText;
      this.animal.property.css['left.%'] = left[i];
      this.animal.property.css['top.%'] = top[i];
      this.animal.property.css['scale'] = this.scalelist[scale[i]];
      switch (textType) {
        case 'underText':
          this.animal.text = this.dataList[code[i]].underText;
          break;
        case 'upperText':
          this.animal.text = this.dataList[code[i]].upperText;
          break;
        case 'tsText':
          this.animal.text = this.dataList[code[i]].tsText;
          break;
      }
      this.animals.push(this.animal);
    }
    return this.animals;
  }

}
