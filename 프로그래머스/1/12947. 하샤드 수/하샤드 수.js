function solution(x) {
    
    const numArr = String(x).split("").map(Number);
    
    console.log(numArr);
    
    let numSum = 0
    
    numArr.forEach(num => numSum += num);
    
    
    return x % numSum === 0
    
    
    var answer = true;
    return answer;
}