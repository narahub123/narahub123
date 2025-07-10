function solution(n, m) {
    let answer = [];
    
    const a = Math.max(n , m);
    const b = Math.min(n, m);
    
    // 최대 공약수 구하기 
    // b의 약수 구하기
    const divisors = [];
    
    for(let i = 1; i <= b; i++){
        if(b % i === 0) {
            divisors.push(i);
        }
    }
    
    // console.log(divisors);
    
    // b의 약수 중 a를 나눌 수 있는 약수 확인 
    for(let i = divisors.length - 1; i >= 0; i--){
        if(a % divisors[i] === 0) {
            console.log(divisors[i]);
            answer.push(divisors[i]);
            break; 
        }
    }
    
    // console.log(answer[0]);
    
    // 최소 공배수 구하기 
    const lcm = answer[0] * a / answer[0] * b / answer[0]
    
    // console.log(lcm)
    
    answer.push(lcm);
    
    return answer;
}