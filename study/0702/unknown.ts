let value2: unknown = 10;

console.log(value2);

value2 = "hello";

console.log(value2);

value2 = new Array();
console.log(value2);

// value2.push(33); // 타입 에러, 타입 가드?

if (value2 instanceof Array) {
  value2.push(33);
}

console.log(value2);
