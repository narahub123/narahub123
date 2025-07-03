// 3. 속성 변경하기
// Counter 클래스 생성
// count라는 숫자 속성,
// increase 메서드 : 호출 시 1 증가
// show 현재 숫자 출력
class Counter {
  // counter: number = 0;

  constructor(public counter: number) {}

  increase() {
    this.counter++;
  }

  show() {
    console.log(this.counter);
  }
}

let counter = new Counter(1);

counter.increase();
counter.increase();
counter.increase();

counter.show();
