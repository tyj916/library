"use strict";

class Library {
  constructor(booklist = []) {
    this.booklist = booklist;
  }

  addBook(book) {
    this.booklist.push(book);
  }

  removeBook(book) {
    this.booklist.splice(book.index, 1);
  }
}

class Book {
  constructor(title, author, pages, isRead, index) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.isRead = Boolean(isRead);
    this.index = index;
  }
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

const myLibrary = new Library;
myLibrary.addBook(book1);
myLibrary.addBook(book2);


const library = (function (library) {

  // cache DOM
  const booksContainer = document.querySelector(".books");
  const addBookButton = booksContainer.querySelector('#add-book');
  const dialog = document.querySelector("#add-book-dialog");
  const confirmAddBookButton = dialog.querySelector("#confirm-dialog");

  // bind events
  addBookButton.addEventListener('click', () => dialog.showModal());
  confirmAddBookButton.addEventListener('click', addBook);
  booksContainer.addEventListener('click', readBook);

  renderLibrary();

  function addBook(event) {
    event.preventDefault();
  
    const newBookTitle = document.querySelector("#new-book-title");
    const newBookAuthor = document.querySelector("#new-book-author");
    const newBookPages = document.querySelector("#new-book-pages");
    const newBookRead = document.querySelector("#new-book-read");
  
    const newBook = new Book(newBookTitle.value,
                             newBookAuthor.value,
                             newBookPages.value,
                             newBookRead.checked);
    addBookToLibrary(newBook, myLibrary);
  
    const form = dialog.querySelector("form");
    form.reset();
  
    dialog.close();
  }

  function readBook(event) {
    const target = event.target;
    const targetBookIndex = target.parentNode.dataset.indexNumber;
  
    if (target.tagName !== 'BUTTON') return;
  
    switch (target.value) {
      case 'read-status':
        target.classList.toggle('read');
        if (target.classList.contains('read')) {
          target.textContent = 'Read';
          myLibrary[targetBookIndex].isRead = true;
        } else {
          target.textContent = 'Not read';
          myLibrary[targetBookIndex].isRead = false;
        }
        break;
  
      case 'remove-book':
        myLibrary.splice(targetBookIndex, 1);
        refreshBooklist();
        break;
    }
  }

  function renderLibrary() {
    const books = booksContainer.querySelectorAll(".book");
    books.forEach(book => book.remove());
  
    library.forEach((book, index) => {
      const newBook = document.createElement('div');
      newBook.classList.add('book', 'card');
      newBook.dataset.indexNumber = index;
  
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
  
      const readStatus = document.createElement('button');
      readStatus.classList.add('read-status')
      if (book.isRead) {
        readStatus.classList.add('read');
        readStatus.textContent = 'Read';
      } else {
        readStatus.textContent = 'Not read';
      }
      readStatus.value = 'read-status';
      newBook.appendChild(readStatus);
  
      const removeButton = document.createElement('button');
      removeButton.classList.add('remove-book');
      removeButton.textContent = 'Remove';
      removeButton.value = 'remove-book';
      newBook.appendChild(removeButton);
  
      booksContainer.appendChild(newBook);
    })
  }
})(myLibrary.booklist);
