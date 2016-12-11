/// <reference path="./vendingMachine"/>


//import VendingMachine = vendingMachineApp.VendingMachine;

let machine = new VendingMachine();
console.log("setting VM size: "+VendingMachineSize.medium);
machine.size=VendingMachineSize.medium;
console.log(ko.utils.stringifyJson(machine.cells));
ko.applyBindings(machine);
