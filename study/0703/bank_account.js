var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var _BankAccount_balance;
// 접근 제한자 (private)
var BankAccount = /** @class */ (function () {
    function BankAccount() {
        _BankAccount_balance.set(this, 0);
    }
    BankAccount.prototype.deposit = function (amount) {
        __classPrivateFieldSet(this, _BankAccount_balance, __classPrivateFieldGet(this, _BankAccount_balance, "f") + amount, "f");
    };
    BankAccount.prototype.getBalance = function () {
        console.log(__classPrivateFieldGet(this, _BankAccount_balance, "f"));
    };
    BankAccount.prototype.setBalance = function (amount) {
        __classPrivateFieldSet(this, _BankAccount_balance, amount, "f");
    };
    return BankAccount;
}());
_BankAccount_balance = new WeakMap();
var account = new BankAccount();
// account.#balance = 1000; // 에러
account.setBalance(1000);
account.getBalance();
