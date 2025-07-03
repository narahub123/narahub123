function solution(n) {
    
    let i = 1
    
    while(i <= n){
        if((n / i) === i ){
            return Math.pow(i+1, 2);
        }
        i++;
    }
    
    return -1;
}