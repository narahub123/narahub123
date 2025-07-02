function solution(n) {
    
    // 숫자를 문자열로 변환
    const str = n.toString();
    
    // 문자열 분해 후 숫자로 변환
    const numArr = str.split('').map(Number);
    
    // 숫자 배열을 정렬 후 역정렬
    const reversedNumArr = numArr.sort().reverse();
    
    // 배열 요소를 합친 후 숫자로 변환 
    const answer = Number(reversedNumArr.join(""))
    
    
    return answer;
}