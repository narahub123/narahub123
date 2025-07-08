function solution(price, money, count) {
    let sum = price * (count * (count + 1) / 2);
    
    const lack = sum - money 
    
    
    
    
    
    
    var answer = lack > 0 ? lack : 0;

    return answer;
}