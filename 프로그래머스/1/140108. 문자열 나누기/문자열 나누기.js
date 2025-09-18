function solution(s) {
    let firstLetter = s[0];
    let curIndex = 0;
    let sameCount = 0;
    let diffCount = 0;
    
    const depriveds = []
    
    for(let i = 0; i < s.length; i++){
        const letter  = s[i];
        
        if(letter === firstLetter){
            sameCount++;
        } else {
            diffCount++;
        }
        
        if(sameCount === diffCount){
            const next = i + 1 <= s.length ? i + 1 : s.length;
            const deprived = s.slice(curIndex, next);
            
            depriveds.push(deprived);
            curIndex = next;
            firstLetter = s[next];
        }
    }
    
    if(curIndex !== s.length){
        depriveds.push(s.slice(curIndex));
    }
    
    var answer = depriveds.length;
    return answer;
}