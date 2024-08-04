function generateBook(title, author, ISBN, publishedYear) {
  const obj = {};

  obj.title = title;
  obj.author = author;
  obj.ISBN = ISBN;
  obj.publishedYear = publishedYear;

  obj.getBookInfo = function () {
    return `Title: ${this.title}, Author: ${this.author}, ISBN: ${this.ISBN} & Published Year: ${this.publishedYear}`;
  };
}

function AuthorDetails(name, birthYear, books) {
  this.name = name;
  this.birthYear = birthYear;
  this.books = books;

  this.addBook = function (bookName) {
    this.books.push(bookName);
  };
}

class Library {
  constructor(name, books) {
    this.name = name;
    this.books = books;
  }

  addBook(bookObj) {
    this.books.push(bookObj);
  }

  findBooksByISBN(ISBN) {
    this.books.forEach((ele) => {
      if (ele.ISBN === ISBN) {
        return ele;
      }
    });
  }

  getAllBooks() {
    return this.books;
  }
}
