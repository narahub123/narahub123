// Constructor 사용
var Product = /** @class */ (function () {
    function Product(name, price) {
        this.name = name;
        this.price = price;
    }
    Product.prototype.display = function () {
        console.log("\uC81C\uD488\uBA85 : ".concat(this.name, ", \uAC00\uACA9: ").concat(this.price, "\uB9CC\uC6D0"));
    };
    return Product;
}());
var product1 = new Product("MacBook", 150);
product1.display();
