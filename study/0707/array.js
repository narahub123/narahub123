const nums = [1, 2, 3, 4, 5];

// map
const squares = nums.map((n) => n ** 2);

console.log(squares); // [ 1, 4, 9, 16, 25 ]

for (const val of squares) {
  console.log(`val => ${val}`);
}

// (val) => 1
// (val) => 4
// (val) => 9
// (val) => 16
// (val) => 25

for (let i = 0; i < nums.length; i++) {
  console.log(`nums[${i}] => ${nums[i]} : squares[${i}] => ${squares[i]}`);
}

// nums[0] => 1 : squares[0] => 1
// nums[1] => 2 : squares[1] => 4
// nums[2] => 3 : squares[2] => 9
// nums[3] => 4 : squares[3] => 16
// nums[4] => 5 : squares[4] => 25

// filter
const evens = nums.filter((n) => n % 2 === 0);

console.log("짝수 배열", evens);

for (const val of evens) {
  console.log(`val => ${val}`);
}

// (val) => 2
// (val) => 4

// reduce
const sum = nums.reduce((acc, cur) => acc + cur, 0);
console.log("합계", sum); // 합계 15

const sum2 = nums.reduce((acc, cur) => {
  acc += cur;
  console.log(` cur => ${cur}, acc => ${acc}`);

  return acc;
}, 0);

console.log(`sum => ${sum2}`);

// (cur) => 1, (acc) => 1
// (cur) => 2, (acc) => 3
// (cur) => 3, (acc) => 6
// (cur) => 4, (acc) => 10
// (cur) => 5, (acc) => 15

// find
const found = nums.find((n) => n > 2);

console.log(`found => ${found}`); // found => 3

// some
const hasNegative = nums.some((n) => n < 0);
console.log(hasNegative);

// every
const allPositive = nums.every((n) => n > 0);
console.log(allPositive);

// flatMap
const nested = [1, 2, 3];

const duplicated = nested.flatMap((n) => [n, n]);

console.log(duplicated); // [ 1, 1, 2, 2, 3, 3 ]

for (let nest of duplicated) {
  console.log(`nest => ${nest}`);
}

// (nest) => 1
// (nest) => 1
// (nest) => 2
// (nest) => 2
// (nest) => 3
// (nest) => 3

// const nested = [1, 2, [(3, 4, [5, 6])]];
