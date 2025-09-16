function solution(s, skip, index) {
  const letters = 'abcdefghijklmnopqrstuvwxyz';
  
  // skip된 문자를 제외한 알파벳 배열
  const available = Array.from(letters).filter(ch => !skip.includes(ch));

  // 각 문자를 변환
  const answer = Array.from(s).map(ch => {
    const pos = available.indexOf(ch);
    const newPos = (pos + index) % available.length; // wrap-around
    return available[newPos];
  });

  return answer.join('');
}
