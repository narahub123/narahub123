class Book {
  //   title: string;
  //   author: string;
  constructor(public title: string, public author: string) {}
}

let book1 = new Book("책1", "저자1");
let book2 = new Book("책2", "저자2");
let book3 = new Book("책3", "저자3");

let books1: Book[] = [book1, book2, book3];

let books2: Book[] = Array<Book>();
books2.push(book1);
books2.push(book2);
books2.push(book3);

for (let i = 0; i < books1.length; i++) {
  console.log(`제목 : ${books1[i].title} / 저자 : ${books1[i].author}`);
}

for (const book of books1) {
  console.log(`제목 : ${book.title} / 저자 : ${book.author}`);
}

books1.forEach((book) =>
  console.log(`제목 : ${book.title} / 저자 : ${book.author}`)
);

books2.forEach((book) =>
  console.log(`제목 : ${book.title} / 저자 : ${book.author}`)
);
