function identity(value) {
    return value;
}
var output1 = identity("log");
console.log(output1);
var output2 = identity(123);
console.log(output2);
function getValue(obj, key) {
    return obj[key];
}
var object = { name: "John", age: 20 };
var result = getValue(object, "name");
console.log(result);
