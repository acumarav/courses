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


