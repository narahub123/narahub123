// Constructor 사용
class Product {
  constructor(public name: string, public price: number) {}

  display() {
    console.log(`제품명 : ${this.name}, 가격: ${this.price}만원`);
  }
}

const product1 = new Product("MacBook", 150);
product1.display();
