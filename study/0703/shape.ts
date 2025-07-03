// 추상 클래스
abstract class Shape {
  // 멤버 변수
  size: number;

  // 일반 메서드
  calculateArea(): number {
    return 1;
  }

  // 추상 메서드 정의 : 최소 하나는 있어야 함
  abstract getAreaRectangle(width: number, height: number): number;
  abstract getAreaCircle(radius: number): number;
}

class Rectangle extends Shape {
  getAreaRectangle(width: number, height: number): number {
    return width * height;
  }

  getAreaCircle(radius: number): number {
    throw new Error("Unimplemented method");
  }
}

class Circle extends Shape {
  getAreaRectangle(width: number, height: number): number {
    throw new Error("Unimplemented method");
  }

  getAreaCircle(radius: number): number {
    return Math.PI * Math.pow(radius, 2);
  }
}
