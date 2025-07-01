"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makePerson = makePerson;
exports.testMakePerson = testMakePerson;
function makePerson(name, age) {
    return { name, age };
    //   {name, age} ===
    //   {
    //     name: name, age: age
    //   }
}
function testMakePerson() {
    console.log(makePerson("Jane", 23), makePerson("Jack", 33));
}
