"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var util = require("./lib/utilityFunctions");
function PrintBookInfo(item) {
    console.log(item.title + " was authored by " + item.author);
}
function LogFavoriteBooks(_a) {
    var book1 = _a[0], book2 = _a[1], others = _a.slice(2);
    PrintBookInfo(book1);
    PrintBookInfo(book2);
    console.log(others);
}
console.log("APP TS is running...");
LogFavoriteBooks(util.GetAllBooks());
var _a = util.GetAllBooks(), book1 = _a[0], book2 = _a[1];
var booktitle = book1.title, bookauthor = book1.author;
console.log(booktitle);
console.log(bookauthor);
//spread operation
var poets = ['Shelley', 'Collins', 'Hughes'];
var authors = ['Bykov', 'Kupala'].concat(poets);
console.log(authors);
//Type Aliases
var empCategory;
// empCategory="worker"; - compiler ERROR
empCategory = "Manager";
var another = 'Manager';
//Typles
var myTyple = [10, "Alex"];
console.log(myTyple);
//Key-value
var catalogLocation = ["A 123.456", book1];
var anotherLocation = ["A 123.456", book2];
//anotherLocation[2]=book2;
//union and intersection types
var allBooks = util.GetAllBooks();
var allMagazines = util.GetAllMagazines();
var readingMaterial = allMagazines[0]; //allBooks[0];
function PrintTitle(item) {
    console.log(item.title);
}
function GetMagazineByFrequency(prefferFrequency) {
}
//# sourceMappingURL=app.js.map