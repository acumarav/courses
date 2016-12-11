/// <reference path="./coin.ts"/>
/// <reference path="./product.ts"/>
//module vendingMachineApp {

class Cell{
  constructor(public product: CocaCola){

  }
}

     class VendingMachine {
        private paid = ko.observable(0);

        acceptedCoins: Quarter[]=[new Quarter()];

        acceptCoin = (coin: Quarter): void => {
          let oldTotal= this.paid()

          if(oldTotal>3){
            let much=true;
          }
          console.log("oldTotal: "+oldTotal);
          console.log("much: "+much);
          this.paid(oldTotal+coin.Value)
        }
    }
//}
