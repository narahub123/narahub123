// 클래스 간 관계 만들기
// Car 클래스, Driver 클래스 생성
// Driver가 Car를 운전하는 구조
// drive 메서드

class Car {
  drive(driver: Driver) {
    console.log(`${driver.name}님이 자동차를 운전합니다.`);
  }
}

class Driver {
  name: string;
}

let car = new Car();
let driver = new Driver();
driver.name = "홍길동";
car.drive(driver);
