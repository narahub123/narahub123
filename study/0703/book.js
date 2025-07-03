var Book = /** @class */ (function () {
    //   title: string;
    //   author: string;
    function Book(title, author) {
        this.title = title;
        this.author = author;
    }
    return Book;
}());
var book1 = new Book("책1", "저자1");
var book2 = new Book("책2", "저자2");
var book3 = new Book("책3", "저자3");
var books1 = [book1, book2, book3];
var books2 = Array();
books2.push(book1);
books2.push(book2);
books2.push(book3);
for (var i = 0; i < books1.length; i++) {
    console.log("\uC81C\uBAA9 : ".concat(books1[i].title, " / \uC800\uC790 : ").concat(books1[i].author));
}
for (var _i = 0, books1_1 = books1; _i < books1_1.length; _i++) {
    var book = books1_1[_i];
    console.log("\uC81C\uBAA9 : ".concat(book.title, " / \uC800\uC790 : ").concat(book.author));
}
books1.forEach(function (book) {
    return console.log("\uC81C\uBAA9 : ".concat(book.title, " / \uC800\uC790 : ").concat(book.author));
});
books2.forEach(function (book) {
    return console.log("\uC81C\uBAA9 : ".concat(book.title, " / \uC800\uC790 : ").concat(book.author));
});
