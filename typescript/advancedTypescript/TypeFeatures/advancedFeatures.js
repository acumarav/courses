"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var classes_1 = require("./classes");
require("./LibrarianExtension");
//Polymorphic this types
var LibraryBook = (function () {
    function LibraryBook() {
    }
    LibraryBook.prototype.Checkout = function () {
        //do checkout
        console.log('Checking out a book.');
        if (this instanceof ElectronicBook) {
            console.log("Ebook checkout"); //this is type specific here
        }
        return this;
    };
    LibraryBook.prototype.Checkin = function () {
        console.log('Checking in a book.');
        return this;
    };
    return LibraryBook;
}());
var ChildrensBook = (function (_super) {
    __extends(ChildrensBook, _super);
    function ChildrensBook() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ChildrensBook.prototype.Clean = function () {
        console.log('Cleaning a book.');
        return this;
    };
    return ChildrensBook;
}(LibraryBook));
var ElectronicBook = (function (_super) {
    __extends(ElectronicBook, _super);
    function ElectronicBook() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ElectronicBook.prototype.RemoveFromCustomerDevice = function () {
        console.log("Removing from device");
        return this;
    };
    return ElectronicBook;
}(LibraryBook));
var kidbook = new ChildrensBook();
kidbook.Checkin().Clean().Checkout();
var ebook = new ElectronicBook();
ebook.Checkin().RemoveFromCustomerDevice().Checkout();
var newLibrarian = new classes_1.UniversityLibrarian();
newLibrarian.hostSeminar("topic"); //From Extension
//Type Guards
var x = 123;
if (typeof x === 'string') {
    //Compiler knows that it is string
    var charValue = x.charAt(1);
}
else {
    //Compiler knows that it is number
    x.toExponential(5);
}
