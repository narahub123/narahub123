// override
class Animal {
  sound() {
    console.log("...");
  }
}

class Dog extends Animal {
  sound(): void {
    console.log("멍멍");
  }
}

class Cat extends Animal {
  sound(): void {
    console.log("야옹!");
  }
}

const dog = new Dog();

dog.sound();

const cat = new Cat();

cat.sound();

// 다형성
const animals: Animal[] = [new Dog(), new Cat()];

animals.forEach((animal) => animal.sound());
