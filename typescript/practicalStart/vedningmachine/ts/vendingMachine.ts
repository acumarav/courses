module vendingMachineApp {

    export class VendingMachine {
      private paid = 0;
      acceptCoin(coin: Quarter): void => {this.paid+=coin.Value}
    }
}
