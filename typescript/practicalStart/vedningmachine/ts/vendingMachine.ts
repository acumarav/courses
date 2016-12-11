/// <reference path="coin.ts"/>
//module vendingMachineApp {

     class VendingMachine {
        private paid = ko.observable(0);
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
