function solution(number, limit, power) {
    // 각 기사들의 공격력 
    const divisors = [];
    
    for(let i = 1; i <= number; i++){
        
        let divisor = 0;
        
        for(let j = 0; j * j <= i; j++){
            
            if(j * j === i) divisor++;
            
            else if(i % j === 0) divisor += 2;
        }    
        
        divisors.push(divisor);
    }
    
    
    // 기사단의 무기 구매 
    const sum = divisors.reduce((acc, cur) => {
        if(cur <= limit) return acc + cur;
        else return acc + power;
    }, 0);
    
    return sum;
}