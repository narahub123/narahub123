export interface CounterState {
  value: number;
  increment: () => void;
  decrement: () => void;
  incrementByNumber: (amount: number) => void;
  reset: () => void;
}
