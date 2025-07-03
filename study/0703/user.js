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
