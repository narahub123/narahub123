function solution(participant, completion) {
  const cnt = new Map();

  // completion 카운트
  for (const name of completion) {
    cnt.set(name, (cnt.get(name) || 0) + 1);
  }

  // participant를 순회하며 하나씩 소진, 없으면 그 사람이 미완주
  for (const name of participant) {
    const left = cnt.get(name) || 0;
    if (left === 0) return name;     // 매칭할 개수가 더 없으면 이 사람이 정답
    cnt.set(name, left - 1);         // 하나만 감소(=하나만 제거)
  }
}
