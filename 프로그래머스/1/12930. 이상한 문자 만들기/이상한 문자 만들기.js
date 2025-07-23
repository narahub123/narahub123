function solution(s) {
    // 문자열 분리
    const split = s.split(/\s/);
    
    const converted = [];
    // 각 문자열을 순서대로 대소문자변경
    for(const word of split){
        
        let letters = '';
        
        for(let i = 0; i < word.length; i++){
            const char = word[i];
            // 짝수번째
            if(i % 2 === 0){
                letters += char.toUpperCase();
            } else {
                // 홀수 번째
                letters += char.toLowerCase();
            }
        }
        
        converted.push(letters);
    }
    
    const newS = converted.join(" ");
    
    
    var answer = newS;
    return answer;
}