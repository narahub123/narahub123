function solution(nums) {
    // nums의 3개의 숫자 조합 
    let primes = [];
    
    for(let i = 0; i < nums.length; i++){
        
        for (let j = i + 1; j < nums.length; j++){   
            
            for(let k = j + 1; k < nums.length ; k++){
                
                const num = nums[i] + nums[j] + nums[k];
                
                // 소수 판별
                if(isPrime(num)){
                    primes.push(num);
                }
            }
        }
        
    }
    
    return primes.length;
}

function isPrime(num){
    if(num === 2){
        return true;
    }
    
    for (let i = 2; i <= Math.floor(Math.sqrt(num)); i++){
        if(num % i === 0 ){
            return false;
        }
    }
    
    return true;
}

