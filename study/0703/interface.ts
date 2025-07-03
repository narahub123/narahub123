// interface : 기능에 대한 추상화
interface Movable {
  move(): void;
}

class Car implements Movable {
  move(): void {
    console.log("car");
  }
}

class Robot implements Movable {
  move(): void {
    console.log("robot");
  }
}
