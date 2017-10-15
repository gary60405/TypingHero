export class Property {
  public css = {
    'left.%': 0,
    'top.%': 0,
    'scale': 0,
    'z-index': 0
  };
  constructor(left: number, top: number, scale: number, zIndex: number) {
    this.css['left.%'] = left;
    this.css['left.%'] = top;
    this.css['scale'] = scale;
    this.css['z-index'] = zIndex;
  }
}

