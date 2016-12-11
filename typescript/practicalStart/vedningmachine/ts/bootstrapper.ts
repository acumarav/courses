/// <reference path="./vendingMachine"/>


//import VendingMachine = vendingMachineApp.VendingMachine;

let machine = new VendingMachine();

machine.size=VendingMachineSize.medium;

ko.applyBindings(machine);
