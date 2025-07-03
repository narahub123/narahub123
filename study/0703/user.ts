// 2. 생성자 연습
// User 클래스 생성
// 생성자에서 name을 받고 greet 메서드 생성
class User {
  // 원 작성법
  name: string;

  constructor(name: string) {
    this.name = name;
  }

  //   constructor(public name: string) {}

  greet() {
    console.log(`안녕하세요. 제 이름은 ${this.name}입니다.`);
  }
}

// 인스턴스 생성
let user = new User("홍길동");
user.greet();
