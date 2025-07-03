var Calculator = /** @class */ (function () {
    function Calculator() {
    }
    Calculator.prototype.add = function (a, b, c) {
        if (!c) {
            console.log(a + b);
        }
        else {
            console.log(a + b + c);
        }
    };
    return Calculator;
}());
var calculator = new Calculator();
calculator.add(4, 5);
calculator.add(4, 5, 6);
