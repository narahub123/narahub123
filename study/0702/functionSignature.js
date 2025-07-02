var runner = function (miles) {
    if (miles > 10)
        return true;
    else
        return false;
};
console.log(runner(11));
var greet = function (name) {
    return "Hello, ".concat(name);
};
console.log(greet("Tom"));
function log(message, user) {
    console.log("".concat(user !== null && user !== void 0 ? user : "system", ": ").concat(message, " "));
}
log("Hello");
log("Hello", "John");
