function solution(a, b, n) {
    // 남은 병
    let remains = n;
    // 총 개수 
    let sum = 0;
    
    while(remains >= a){
        // 마트에 갖다 줄 병 
        const resells = Math.floor(remains / a) * a
    
        // 마트에 갖다주고 받을 병 
        const gains = resells / a * b
    
    
        // 남은 병에 마트에서 받은 병 추가
        remains += (- resells + gains);
        
        // 총 개수에 추가
        sum += gains;
    
    }
    
    
    var answer = sum;
    return answer;
}