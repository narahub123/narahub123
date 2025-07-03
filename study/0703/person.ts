class Person {
  constructor(public name: string, public age: number) {}

  introduce() {
    console.log(`안녕하세요. 저는 ${this.age}살의 ${this.name}입니다.`);
  }
}

const alice = new Person("Alice", 20);

alice.introduce();
