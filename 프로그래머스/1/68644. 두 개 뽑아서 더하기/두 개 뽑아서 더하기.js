function solution(numbers) {
    
    // 중복을 제외한 배열
    const sums = new Set();
    
    
    // 서로 다른 인덱스의 두 개의 수의 합
    for(let i = 0; i < numbers.length; i++){
        for(let j =0; j < numbers.length; j++){
            if(i === j) continue;        
            sums.add(numbers[i] + numbers[j]);
        }
    }
    
    // 오름차순
    const newOrder = [...sums].sort((a, b) => a -b);
    
    var answer = newOrder;
    
    return answer;
}