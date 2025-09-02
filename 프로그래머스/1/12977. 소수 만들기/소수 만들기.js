function solution(nums) {
  // 가능한 최대 합 (가장 큰 3개 합)
  const top3sum = [...nums].sort((a, b) => b - a).slice(0, 3)
    .reduce((acc, v) => acc + v, 0);

  // 소수 테이블 생성 (에라토스테네스 체)
  const prime = Array(top3sum + 1).fill(true);
  prime[0] = prime[1] = false;
  for (let p = 2; p * p <= top3sum; p++) {
    if (prime[p]) {
      for (let q = p * p; q <= top3sum; q += p) prime[q] = false;
    }
  }

  let count = 0;
  for (let i = 0; i < nums.length - 2; i++) {
    for (let j = i + 1; j < nums.length - 1; j++) {
      for (let k = j + 1; k < nums.length; k++) {
        const s = nums[i] + nums[j] + nums[k];
        if (prime[s]) count++;
      }
    }
  }
  return count;
}
