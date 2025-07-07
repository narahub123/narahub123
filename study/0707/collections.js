const set = new Set([1, 2, 2, 2, 3, 4]); // 생성자 호출

console.log(set); // Set(4) { 1, 2, 3, 4 } // 중복 제거됨

set.add(5); // 요소 추가

console.log(set); // Set(5) { 1, 2, 3, 4, 5 }

set.add(5);
console.log(set); // Set(5) { 1, 2, 3, 4, 5 }

set.delete(2); // 요소 삭제

console.log(set); // Set(4) { 1, 3, 4, 5 }

// Map
const map = new Map();

map.set("name", "Lee");

console.log(map); // Map(1) { 'name' => 'Lee' }

const value = map.get("name"); // 값에 접근하기

console.log(value); // Lee

map.set("age", 20);

console.log(map.get("age")); // 20

console.log(map.size); // 2

map.delete("age");

console.log(map); // Map(1) { 'name' => 'Lee' }

// for of 순회
for (const val of set) {
  console.log(val);
}

// 1
// 3
// 4
// 5

for (const [key, val] of map) {
  console.log(key, val); // name Lee
}
