function solution(n) {
    let count = 0;
    
    for (let i = 2 ; i <= n; i++){
        if(isPrime(i)) count++;
    }
    
    return count;
}

const isPrime =  (num) => {
    if(num === 2) return true;
    
    for (let j = 2 ; j <= Math.floor(Math.sqrt(num)) ; j++) {
        if(num % j === 0) return false;
    }
    
    return true;
}