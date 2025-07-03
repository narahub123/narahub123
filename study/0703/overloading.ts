class Calculator {
  add(a: number, b: number): void;

  add(a: number, b: number, c: number): void;

  add(a: number, b: number, c?: number): void {
    if (!c) {
      console.log(a + b);
    } else {
      console.log(a + b + c);
    }
  }
}

const calculator = new Calculator();

calculator.add(4, 5);
calculator.add(4, 5, 6);
