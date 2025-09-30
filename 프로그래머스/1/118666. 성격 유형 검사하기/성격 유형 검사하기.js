
function solution(survey, choices) {
  // 성격 유형 점수표 초기화
  const scores = { R:0, T:0, C:0, F:0, J:0, M:0, A:0, N:0 };

  for (let i = 0; i < survey.length; i++) {
    const [disagreeType, agreeType] = survey[i]; // 예: "RT" -> 'R','T'
    const choice = choices[i];

    if (choice < 4) {
      // 1,2,3 => 비동의 쪽 (첫 문자)에 3,2,1점
      scores[disagreeType] += 4 - choice; // 1->3, 2->2, 3->1
    } else if (choice > 4) {
      // 5,6,7 => 동의 쪽 (둘째 문자)에 1,2,3점
      scores[agreeType] += choice - 4; // 5->1, 6->2, 7->3
    }
    // 4(모르겠음)은 점수 없음
  }

  // 각 지표 쌍에서 점수가 높거나, 동점이면 앞 문자를 선택
  const pick = (a, b) => (scores[a] >= scores[b] ? a : b);

  const result =
    pick('R', 'T') +
    pick('C', 'F') +
    pick('J', 'M') +
    pick('A', 'N');

  return result;
}

