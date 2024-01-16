"use strict";

const myLibrary = [];

function Book(title, author, pages, isRead) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.isRead = Boolean(isRead);
}

function addBookToLibrary(book) {
  return myLibrary.push(book);
}

const book1 = new Book("The Count of Monte Cristo", 
                       "Alexandre Dumas",
                       1276,
                       false);

addBookToLibrary(book1);
console.log(myLibrary);