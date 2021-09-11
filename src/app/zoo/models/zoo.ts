export enum musicStateEnum {
  play = 0,
  pause = 1,
  reset = 2,
  replay = 3,
  ready = 4,
}

export interface CssProperty {
  'left.%': number;
  'top.%': number;
  'scale': number;
  'z-index': number;
}

export interface Animal {
  code: string;
  text: string;
  name: string;
  isDie: boolean;
  property: CssProperty;
}

export interface BaseData {
  underText: string;
  upperText: string;
  tsText: string;
  code: string;
}

export interface AlertInfo {
  content: string;
  display: boolean;
  colorClass: string;
}

export interface ZooConfiguration {
  animalName: string[];
  animalNumber: number;
  scalelist: number[];
  keyCodeMap: KeyCodeMap[];
}

export interface KeyCodeMap {
  underText: string;
  upperText: string;
  tsText: string;
  code: string;
}
