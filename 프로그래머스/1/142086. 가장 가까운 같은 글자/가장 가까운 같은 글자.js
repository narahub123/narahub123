function solution(s) {
    
    // 현재 문자의 위치 
    let curIndex = 0;
    
    const closests = []
    
    for(let i = 0; i < s.length; i++){
        // 현재 문자 이전 문자열
        const beforeStr = s.slice(0, curIndex);
        
        
        // 현재 문자
        const curChar = s[i];
   
        
        // 이전 문자열에서 현재 문자를 찾을 때 가장 마지막 위치
        const lastIndex = beforeStr.lastIndexOf(curChar);
        
        
        closests.push(lastIndex === -1 ? -1 : i - lastIndex);
        
        // 현재 문자의 위치 변경
        curIndex++
    }
    
    var answer = closests;
    return answer;
}