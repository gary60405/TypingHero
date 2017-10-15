import { Property } from './css.model';

export class Animal {
  constructor(public code: string,
              public text: string,
              public name: string,
              public die: boolean,
              public property: Property) {}
}

export class Data {
  constructor(public underText: string,
              public upperText: string,
              public tsText: string,
              public code: string) {}
}
