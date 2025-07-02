function solution(a, b) {
    
    let sum = 0;
    
    const left = a > b ? b : a;
    const right = a > b ? a:b;
    
    for(let i = left; i <= right; i++){
        sum += i
    }
    
    
    var answer = sum;
    return answer;
}