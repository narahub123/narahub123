class User {
  userName: string;
}

class Product {
  productName: string;
}

class Order {
  user: User;
  product: Product;

  summary() {
    console.log(
      `사용자 ${this.user.userName}이(가) ${this.product.productName}을(를) 구매했습니다.`
    );
  }
}

let user = new User();
user.userName = "홍길동";

let product = new Product();
product.productName = "책";

let order = new Order();
order.user = user;
order.product = product;
order.summary();
