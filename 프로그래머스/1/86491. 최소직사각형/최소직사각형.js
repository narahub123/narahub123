function solution(sizes) {
    
   // 가장 큰 수 찾기
    const newArr = sizes.flat().sort((a, b) => b -a)
    const largest = newArr[0];
    
   // 각 배열 중 가장 작은 수 중 가장 큰 수 찾기
    const minMax = sizes.map(arr => Math.min(arr[0], arr[1])).sort((a, b) => b- a)[0];
    
    console.log(minMax);
    
    
    var answer = largest * minMax;
    return answer;
}