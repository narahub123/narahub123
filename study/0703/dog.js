// 1. 간단한 클래스 만들기
// 클래스 두문자는 대문자
// 카멜케이스 사용
var Dog = /** @class */ (function () {
    function Dog() {
    }
    // methods
    Dog.prototype.bark = function () {
        console.log("멍멍");
    };
    return Dog;
}());
var dog = new Dog();
dog.bark();
// 2. 생성자 연습
// User 클래스 생성
// 생성자에서 name을 받고 greet 메서드 생성
var User = /** @class */ (function () {
    function User(name) {
        this.name = name;
    }
    //   constructor(public name: string) {}
    User.prototype.greet = function () {
        console.log("\uC548\uB155\uD558\uC138\uC694. \uC81C \uC774\uB984\uC740 ".concat(this.name, "\uC785\uB2C8\uB2E4."));
    };
    return User;
}());
// 인스턴스 생성
var user = new User("홍길동");
user.greet();
// 3. 속성 변경하기
