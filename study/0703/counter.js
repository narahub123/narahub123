// 3. 속성 변경하기
// Counter 클래스 생성
// count라는 숫자 속성,
// increase 메서드 : 호출 시 1 증가
// show 현재 숫자 출력
var Counter = /** @class */ (function () {
    // counter: number = 0;
    function Counter(counter) {
        this.counter = counter;
    }
    Counter.prototype.increase = function () {
        this.counter++;
    };
    Counter.prototype.show = function () {
        console.log(this.counter);
    };
    return Counter;
}());
var counter = new Counter(1);
counter.increase();
counter.increase();
counter.increase();
counter.show();
