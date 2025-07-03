function solution(absolutes, signs) {
    
    let sum = 0;
    
    for(let i =0; i < absolutes.length; i++){
       let num = absolutes[i];
        const sign = signs[i];
        
        num *= (sign ? 1 : -1);
        
        sum += num;
    }
    
    return sum;
}