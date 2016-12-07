/// <reference path="./vendingMachine"/>
/// <reference path="typings/knockout.d.ts"/>

import VendingMachine = vendingMachineApp.VendingMachine;

let machine = new VendingMachine();

ko.applyBindings(machine);
