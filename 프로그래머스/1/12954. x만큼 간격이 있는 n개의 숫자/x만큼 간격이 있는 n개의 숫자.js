function solution(x, n) {
    var answer = [];
    
    for(let i = 0; i < n;i++){
        const result = x + x * i;
        
        answer.push(result)
    }
    return answer;
}