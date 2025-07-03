// 접근 제한자 (private)
class BankAccount {
  #balance: number = 0;

  deposit(amount: number) {
    this.#balance += amount;
  }

  getBalance() {
    console.log(this.#balance);
  }

  setBalance(amount: number) {
    amount *= 1.1;

    this.#balance = amount;
  }
}

let account = new BankAccount();

// account.#balance = 1000; // 에러
account.setBalance(1000);

account.getBalance();
