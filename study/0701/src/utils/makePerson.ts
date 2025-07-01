export function makePerson(name: string, age: number) {
  return { name, age };
  //   {name, age} ===
  //   {
  //     name: name, age: age
  //   }
}

export function testMakePerson() {
  console.log(makePerson("Jane", 23), makePerson("Jack", 33));
}
