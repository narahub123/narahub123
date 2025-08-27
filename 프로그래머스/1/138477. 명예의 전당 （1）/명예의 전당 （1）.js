function solution(k, score) {
    
    const lowests = [];
    
    for(let i = 0 ; i < score.length; i++){
        const dailyGroup = score.slice(0, i + 1).sort((a, b) => b - a);
        
        lowests.push((i+1) < k ? dailyGroup[dailyGroup.length - 1] : dailyGroup[k - 1]);
        
        
    }
    
    var answer = lowests;
    return answer;
}