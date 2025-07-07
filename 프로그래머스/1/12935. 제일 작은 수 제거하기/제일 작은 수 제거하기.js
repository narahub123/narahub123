function solution(arr) {
    
    // 복사하기 
    const copiedArr = [...arr];
    
    // 정렬하기 
    const sortedArr = copiedArr.sort((a, b) => a - b);
    
    // 가장 작은 수 찾기 
    const smallest = sortedArr[0];
    
    // 가장 작은 수를 기본 배열에서 제거하기 
    const filteredArr = arr.filter(i => i !== smallest);
    
    
    var answer = filteredArr.length > 0 ? filteredArr : [-1];
    
    return answer;
}