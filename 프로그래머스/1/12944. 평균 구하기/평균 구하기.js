function solution(arr) {
    
    let sum = 0;
    
    let length = arr.length;
    
    arr.forEach(i => sum += i);
    
    
    
    var answer = sum / length;
    return answer;
}