function solution(number, limit, power) {
    // 각 기사들의 공격력 
    let answer = 0;
    
    for(let i = 1; i <= number; i++){
        
        let divisor = 0;
        
        for(let j = 0; j * j <= i; j++){
            
            if(j * j === i) divisor++;
            
            else if(i % j === 0) divisor += 2;
        }    
        
        answer += divisor <= limit ? divisor : power;
    }
    
    
    
    return answer;
}