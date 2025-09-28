function solution(board, moves) {
  const n = board.length;
  // 1) 열별 스택 전처리: 아래→위로 스캔해 0이 아니면 push
  const cols = Array.from({ length: n }, () => []);
  for (let c = 0; c < n; c++) {
    for (let r = n - 1; r >= 0; r--) {
      const doll = board[r][c];
      if (doll !== 0) cols[c].push(doll);
    }
  }

  // 2) 시뮬레이션
  const basket = [];
  let removed = 0;

  for (const mv of moves) {
    const c = mv - 1;                 // moves는 1-indexed
    if (cols[c].length === 0) continue; // 빈 열이면 패스

    const doll = cols[c].pop();        // 그 열의 가장 위 인형 꺼내기
    const top = basket[basket.length - 1];

    if (top === doll) {
      basket.pop();
      removed += 2;
    } else {
      basket.push(doll);
    }
  }

  return removed;
}
