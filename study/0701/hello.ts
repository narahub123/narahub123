console.log("Hello World!!");

function greet(name: string): string {
  return `Hello, ${name}`;
}
console.log(greet("Nara"));

let n: number = 1;

let b: boolean = false;

let s: string = "hello";

let o: object = {};

// 타입 추론
let n1 = 1;
let b1 = true;
let s1 = "apple";
let o1 = {};

// any 타입
let a: any = 0;

a = "hello";

a = true;

a = {};

// undefined
let u: undefined = undefined;

// u = 2;

let count = 10,
  message = "Your count";

let result = `${message} is ${count}`;

console.log(result);
