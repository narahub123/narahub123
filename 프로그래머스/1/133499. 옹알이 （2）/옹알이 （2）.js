function solution(babbling) {
  const tokens = ["aya", "ye", "woo", "ma"];
  let answer = 0;

  for (const word of babbling) {
    let i = 0;
    let prev = ""; // 바로 이전에 매칭된 발음
    let valid = true;

    while (i < word.length) {
      let matched = false;

      for (const t of tokens) {
        if (word.startsWith(t, i) && t !== prev) {
          prev = t;
          i += t.length;
          matched = true;
          break;
        }
      }

      if (!matched) {
        valid = false;
        break;
      }
    }

    if (valid) answer++;
  }

  return answer;
}
