function solution(ingredient) {
  let count = 0;
  const st = [];

  for (const x of ingredient) {
    st.push(x);
    const L = st.length;
    if (L >= 4 && st[L-4]===1 && st[L-3]===2 && st[L-2]===3 && st[L-1]===1) {
      st.length -= 4;   // 4개 제거
      count++;
    }
  }
  return count;
}
