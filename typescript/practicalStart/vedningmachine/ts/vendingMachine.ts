/// <reference path="coin.ts"/>
//module vendingMachineApp {

     class VendingMachine {
        private paid = ko.observable(0);
        acceptCoin = (coin: Quarter): void => {
          let oldTotal= this.paid()
          this.paid(oldTotal+coin.Value)
        }
    }
//}
