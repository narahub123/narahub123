console.log("Hello World!!");
function greet(name) {
    return "Hello, ".concat(name);
}
console.log(greet("Nara"));
var n = 1;
var b = false;
var s = "hello";
var o = {};
// 타입 추론
var n1 = 1;
var b1 = true;
var s1 = "apple";
var o1 = {};
// any 타입
var a = 0;
a = "hello";
a = true;
a = {};
// undefined
var u = undefined;
// u = 2;
var count = 10, message = "Your count";
var result = "".concat(message, " is ").concat(count);
console.log(result);
