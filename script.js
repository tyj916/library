"use strict";

const myLibrary = [];

function Book(title, author, pages, isRead) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.isRead = Boolean(isRead);
}

function addBookToLibrary(book, library) {
  library.push(book);
  displayBook(book);
}

function displayBook(book) {
  const newBook = document.createElement('div');
  newBook.classList.add('book', 'card');

  const bookTitle = document.createElement('h3');
  bookTitle.classList.add('book-title');
  bookTitle.textContent = `"${book.title}"`;
  newBook.appendChild(bookTitle);

  const bookAuthor = document.createElement('p');
  bookAuthor.classList.add('author');
  const emphasizeAuthor = document.createElement('em');
  emphasizeAuthor.textContent = book.author;
  bookAuthor.appendChild(emphasizeAuthor);
  newBook.appendChild(bookAuthor);

  const pages = document.createElement('p');
  pages.classList.add('pages');
  pages.textContent = `${book.pages} pages`;
  newBook.appendChild(pages);

  const read = document.createElement('button');
  if (book.isRead) {
    read.classList.add('read');
    read.textContent = 'Read';
  } else {
    read.textContent = 'Not read';
  }
  newBook.appendChild(read);

  const removeButton = document.createElement('button');
  removeButton.classList.add('remove-book');
  removeButton.textContent = 'Remove';
  newBook.appendChild(removeButton);

  const books = document.querySelector('.books');
  books.appendChild(newBook);
}

const book1 = new Book("The Count of Monte Cristo", 
                       "Alexandre Dumas",
                       1276,
                      );
                    
const book2 = new Book("A Gentleman in Moscow",
                       "Amor Towles",
                       719,
                       true,
                      );

myLibrary.push(book2);

for (const book of myLibrary) {
  displayBook(book);
}

addBookToLibrary(book1, myLibrary);