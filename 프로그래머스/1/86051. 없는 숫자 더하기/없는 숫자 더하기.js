function solution(numbers) {
    let sum = 0;
    
    let i = 0;
    
    while(i < 10){
        
        if(!numbers.includes(i)){
            sum += i;
        }
        
        
        i++;
    }
    
    return sum;
}