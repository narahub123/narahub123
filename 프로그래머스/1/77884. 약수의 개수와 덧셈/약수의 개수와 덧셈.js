function solution(left, right) {
   
    // left, right 사이의 수 배열
    const betweenArr = Array.from({length: right - left + 1}).map((_, idx) => left + idx);
    
    let sum = 0;
    
    betweenArr.forEach(item => {
        let numOfDivisors = getDivisorNumber(item);
        
        if(numOfDivisors % 2 === 0){
            sum += item;
        } else {
            sum -= item;
        }
    })
    
    
    
    var answer = sum;
    return answer;
}

function getDivisorNumber (num){
    
    let count = 0;
    
    let i = 1;
    
    while(i <= num){
        if(num % i === 0){
            count++;
        }
        
        i++;
    }
    
    return count;
}