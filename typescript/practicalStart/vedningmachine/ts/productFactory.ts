/// <reference path="./product.ts"/>

class productFactory{

  static GetProduct():Product {
    let rnd=Math.floor(Math.random()*11);
    switch(rnd){
      case 0: return new CocaCola()
      case 1: return new Gummies();
      case 2: return new MilkyWay();
      case 3: return new Hersey();
      case 4: return new Fanta();
      case 5: return new Sprite();
      case 6: return new Plain();
      case 7: return new Cheddar();
      case 8: return new Mints();
      case 9: return new Peanuts();
      case 10: return new Cashews();
    }
  }
}
