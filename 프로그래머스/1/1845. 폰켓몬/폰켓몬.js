function solution(nums) {
    
    let answer = 0;
    
    // 가져갈 수 있는 폰켓몬의 개수
    const halfLength = nums.length / 2;
    
    // 중복을 제거한 폰켓몬의 개수
    const noDupLength = Array.from(new Set(nums)).length;
    
    // 가져 갈 수 있는 폰켓몬의 개수가 
    // 중복을 제거한 개수보다 큰 경우
    // 중복을 제거한 개수만큼의 종류의 폰켓몬을 가져갈 수 있음
    if(halfLength > noDupLength){
        answer = noDupLength
    } else {
        // 폰켓몬의 종류가 가져갈 수 있는 폰켓몬의 개수보다 큰 경우 
        answer = halfLength
    }
    
    return answer;
}