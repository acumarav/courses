import * as util from './lib/utilityFunctions';

import {Book, Logger, Author, Librarian, Magazine} from './interfaces';

function PrintBookInfo(item: Book): void {
    console.log(`${item.title} was authored by ${item.author}`);
}

function LogFavoriteBooks([book1, book2, ...others]: Book[]) {
    PrintBookInfo(book1);
    PrintBookInfo(book2);
    console.log(others);
}

console.log("APP TS is running...")
LogFavoriteBooks(util.GetAllBooks());


let [book1, book2] = util.GetAllBooks();
let {title: booktitle, author: bookauthor} = book1;
console.log(booktitle);
console.log(bookauthor);
//spread operation

let poets: string[] = ['Shelley', 'Collins', 'Hughes'];
let authors: string[] = ['Bykov', 'Kupala', ...poets];
console.log(authors);

<<<<<<< HEAD
//Type Aliases
let empCategory: 'Manager' | 'Non-Manager';
// empCategory="worker"; - compiler ERROR
empCategory = "Manager";
type EmployeeCategory = 'Manager' | 'Non-Manager';
let another: EmployeeCategory = 'Manager';
=======
>>>>>>> 6ec989084faaa9196383b2013f57390ae4cc5139

//Typles
let myTyple: [number, string] = [10, "Alex"]
console.log(myTyple);

//Key-value

let catalogLocation: [string, Book] = ["A 123.456", book1];

interface  KeyValuePair<K, V> extends Array<K | V> {
    0: K;
    1: V;
}

let anotherLocation: KeyValuePair<string, Book> = ["A 123.456", book2];
//anotherLocation[2]=book2;

//union and intersection types

let allBooks: Book[] = util.GetAllBooks();
let allMagazines: Magazine[] = util.GetAllMagazines();
let readingMaterial: Book | Magazine = allMagazines[0]; //allBooks[0];


function PrintTitle(item: Book | Magazine) {
    console.log(item.title);
}

//let serialNovel: Book & Magazine = allBooks[0];

<<<<<<< HEAD
type Frequency = 'monthly' | 'annually';
function  GetMagazineByFrequency(prefferFrequency: Frequency){

}
=======
>>>>>>> 6ec989084faaa9196383b2013f57390ae4cc5139

