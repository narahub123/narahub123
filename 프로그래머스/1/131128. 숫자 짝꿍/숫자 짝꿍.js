function solution(X, Y) {
  // X, Y는 문자열
  const cntX = new Uint32Array(10);
  const cntY = new Uint32Array(10);

  for (let i = 0; i < X.length; i++) cntX[X.charCodeAt(i) - 48]++;
  for (let i = 0; i < Y.length; i++) cntY[Y.charCodeAt(i) - 48]++;

  let out = [];
  for (let d = 9; d >= 0; d--) {
    const k = Math.min(cntX[d], cntY[d]);
    if (k) out.push(String.fromCharCode(48 + d).repeat(k));
  }

  if (out.length === 0) return "-1";

  const ans = out.join("");
  // 모두 0으로만 구성되면 "0"
  return ans[0] === "0" ? "0" : ans;
}
