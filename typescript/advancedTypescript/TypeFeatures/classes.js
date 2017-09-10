"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Employee = (function () {
    function Employee() {
    }
    Employee.prototype.addToSchedule = function () {
        console.log('Employee added to schedule.');
    };
    Employee.prototype.logTitle = function () {
        ;
        console.log("Employee has the title " + this.title + ".");
    };
    return Employee;
}());
exports.Employee = Employee;
var Researcher = (function () {
    function Researcher() {
    }
    Researcher.prototype.doResearch = function (topic) {
        console.log("Doing research on " + topic + ".");
    };
    return Researcher;
}());
exports.Researcher = Researcher;
exports.CLASS_INFO = Symbol();
var UniversityLibrarian = (function () {
    function UniversityLibrarian() {
    }
    UniversityLibrarian.prototype[exports.CLASS_INFO] = function () {
        console.log('This class represents a UniversityLibrarian.');
    };
    UniversityLibrarian[Symbol.hasInstance] = function (obj) {
        return obj.hasOwnProperty('name') && obj.hasOwnProperty('assistCustomer');
    };
    UniversityLibrarian.prototype.assistCustomer = function (custName) {
        console.log(this.name + ' is assisting ' + custName);
    };
    UniversityLibrarian.prototype.assistFaculty = function () {
        console.log('Assisting faculty.');
    };
    return UniversityLibrarian;
}());
exports.UniversityLibrarian = UniversityLibrarian;
var PublicLibrarian = (function () {
    function PublicLibrarian() {
    }
    PublicLibrarian.prototype.assistCustomer = function (custName) {
        console.log('Assisting customer.');
    };
    PublicLibrarian.prototype.teachCommunity = function () {
        console.log('Teaching community.');
    };
    return PublicLibrarian;
}());
exports.PublicLibrarian = PublicLibrarian;
var ReferenceItem = (function () {
    function ReferenceItem(title, year) {
        this.title = title;
        this.year = year;
        console.log('Creating a new ReferenceItem...');
    }
    ReferenceItem.prototype.printItem = function () {
        console.log(this.title + " was published in " + this.year + ".");
        console.log("Department: " + ReferenceItem.department);
    };
    Object.defineProperty(ReferenceItem.prototype, "publisher", {
        get: function () {
            return this._publisher.toUpperCase();
        },
        set: function (newPublisher) {
            this._publisher = newPublisher;
        },
        enumerable: true,
        configurable: true
    });
    return ReferenceItem;
}());
ReferenceItem.department = 'Research';
exports.ReferenceItem = ReferenceItem;
