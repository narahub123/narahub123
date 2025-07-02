class Person2 {
  //   name: string;
  //   age: number;

  //   constructor(name: string, age: number) {
  //     (this.name = name), (this.age = age);
  //   }
  constructor(public name: string, private age: number) {}

  introduce(): string {
    return `Hi, I'm ${this.name}`;
  }
}

class Car implements Vehicle {
  carModel: string;
  owner: string;
  carWeight: number;
  buyYear: number;
  isSunk: boolean;
  distance: number;

  constructor(
    carModel: string,
    owner: string,
    carWeight: number,
    buyYear: number,
    isSunk: boolean,
    distance: number
  ) {
    this.carModel = carModel;
    this.owner = owner;
    this.carWeight = carWeight;
    this.buyYear = buyYear;
    this.isSunk = isSunk;
    this.distance = distance;
  }

  drive() {
    console.log("Go");
  }

  alarm() {
    console.log("Beep Beep");
  }

  back() {
    console.log("Back");
  }

  wipe() {
    console.log("Wipe");
  }

  break(): void {
    console.log("Break");
  }

  accelate(): void {
    console.log("Accelate");
  }

  trunck(): void {
    console.log("Trunck");
  }
}

class DumpTruck extends Car {
  storage: number;

  constructor(
    carModel: string,
    owner: string,
    carWeight: number,
    buyYear: number,
    isSunk: boolean,
    distance: number,
    storage: number
  ) {
    super(carModel, owner, carWeight, buyYear, isSunk, distance);
    this.storage = storage;
  }

  operate() {
    console.log("Operate");
  }

  spray() {
    console.log("Spray");
  }
}

class Bus extends Car {
  passenger: number;
  busNumber: number;

  constructor(
    carModel: string,
    owner: string,
    carWeight: number,
    buyYear: number,
    isSunk: boolean,
    distance: number,
    passenger: number,
    busNumber: number
  ) {
    // 부모의 생성자를 호출
    super(carModel, owner, carWeight, buyYear, isSunk, distance);
    this.passenger = passenger;
    this.busNumber = busNumber;
  }

  openDoor() {
    console.log("Open door");
  }

  // 공통 메서드를 따로 구현(override)
  trunck() {
    console.log("");
  }
}

interface Vehicle {
  break(): void;
  accelate(): void;
  trunck(): void;
}
