function solution(s) {
    
    // 숫자 문자열
    const numStrObj = {
        "zero": 0, 
        "one": 1, 
        "two":2, 
        "three":3, 
        "four":4, 
        "five":5, 
        "six":6, 
        "seven":7, 
        "eight":8, 
        "nine":9
    };
    
    // 문자열에 숫자문자열이 있는지 확인
   const iterator = s.matchAll(/(zero|one|two|three|four|five|six|seven|eight|nine)/g);
    
    let newS = ""
    
    let curIndex = 0;
    
    const matches = Array.from(iterator);
    
    if(matches.length === 0){
      newS = s;  
    } else {
        for(const match of matches){
            
            // 찾은 문자열
            const word = match[0];
            
            console.log(word)
            
            // 문자열의 시작 위치
            const startIndex = match.index;
            
            // 현재 인덱스와 시작 인덱스가 일치하지 않는 경우
            if(curIndex !== startIndex){
                newS += s.slice(curIndex, startIndex);
            }
            
            newS += numStrObj[word];
            
            // 현재 위치 갱신
            curIndex = startIndex + word.length;   
        }
        
        if(curIndex !== s.length){
            newS += s.slice(curIndex);
        }
    } 
    
    var answer = Number(newS);
    return answer;
}