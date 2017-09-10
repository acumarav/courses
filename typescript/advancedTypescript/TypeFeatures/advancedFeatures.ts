import {Category} from './enums';
import {Book, Logger, Author, Librarian, Magazine} from './interfaces';
import {UniversityLibrarian, ReferenceItem, Employee, Researcher} from './classes';
import * as util from './lib/utilityFunctions';
import './LibrarianExtension';

//Polymorphic this types

class LibraryBook {
    Checkout(): this {
        //do checkout
        console.log('Checking out a book.');

        if (this instanceof ElectronicBook) {
            console.log("Ebook checkout");//this is type specific here
        }
        return this;
    }

    Checkin(): this {
        console.log('Checking in a book.');
        return this;
    }
}

class ChildrensBook extends LibraryBook {
    Clean(): this {
        console.log('Cleaning a book.');
        return this;
    }
}

class ElectronicBook extends LibraryBook {
    RemoveFromCustomerDevice(): this {
        console.log("Removing from device");
        return this;
    }
}


let kidbook = new ChildrensBook();
kidbook.Checkin().Clean().Checkout();

let ebook = new ElectronicBook();
ebook.Checkin().RemoveFromCustomerDevice().Checkout();

//Declaration merging
interface  EmployeeA {
    name: string;
    doWork: () => void;
}

interface EmployeeA {
    title: string;
    phone: string;
}

let newLibrarian = new UniversityLibrarian();
newLibrarian.hostSeminar("topic");//From Extension

//Type Guards
let x: string | number = 123;
if (typeof x === 'string') {
    //Compiler knows that it is string
    let charValue = x.charAt(1);
}
else {
    //Compiler knows that it is number
    x.toExponential(5);
}
