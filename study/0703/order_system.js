var User = /** @class */ (function () {
    function User() {
    }
    return User;
}());
var Product = /** @class */ (function () {
    function Product() {
    }
    return Product;
}());
var Order = /** @class */ (function () {
    function Order() {
    }
    Order.prototype.summary = function () {
        console.log("\uC0AC\uC6A9\uC790 ".concat(this.user.userName, "\uC774(\uAC00) ").concat(this.product.productName, "\uC744(\uB97C) \uAD6C\uB9E4\uD588\uC2B5\uB2C8\uB2E4."));
    };
    return Order;
}());
var user = new User();
user.userName = "홍길동";
var product = new Product();
product.productName = "책";
var order = new Order();
order.user = user;
order.product = product;
order.summary();
