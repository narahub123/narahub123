function identity<T>(value: T): T {
  return value;
}

const output1 = identity<string>("log");

console.log(output1);

const output2 = identity<number>(123);

console.log(output2);

function getValue<K extends string, V>(obj: Record<K, V>, key: K): V {
  return obj[key];
}

let object = { name: "John", age: 20 };

let result = getValue(object, "name");

console.log(result);
