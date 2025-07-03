// 클래스 간 관계 만들기
// Car 클래스, Driver 클래스 생성
// Driver가 Car를 운전하는 구조
// drive 메서드
var Car = /** @class */ (function () {
    function Car() {
    }
    Car.prototype.drive = function (driver) {
        console.log("".concat(driver.name, "\uB2D8\uC774 \uC790\uB3D9\uCC28\uB97C \uC6B4\uC804\uD569\uB2C8\uB2E4."));
    };
    return Car;
}());
var Driver = /** @class */ (function () {
    function Driver() {
    }
    return Driver;
}());
var car = new Car();
var driver = new Driver();
driver.name = "홍길동";
car.drive(driver);
