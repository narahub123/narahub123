function solution(s) {
    // 문자열 분해하기 
    const splitStrs = s.split("");
    
    console.log(splitStrs);
    
    
    const sorted = splitStrs.sort((a, b) => b.charCodeAt(0) - a.charCodeAt(0));
    
    console.log(sorted);
    
    var answer = sorted.join("");
    return answer;
}