function solution(arr, divisor) {
    let dividedNumArr = [];
    
    arr.forEach(num => {
        if(num % divisor === 0){
            dividedNumArr.push(num);
        }
    })
    
    
    return dividedNumArr.length > 0 ? dividedNumArr.sort((a, b) =>  a - b): [-1];
}