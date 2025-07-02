function solution(s){
    
    const split = s.toLowerCase().split("");
    
    const numOfPs = split.filter(s => s === "p").length;
    
    const numOfYs = split.filter(s => s === "y").length;
    
    if(numOfPs === numOfYs) {
        return true 
    } else {
        return false
    }
    
    
    
    var answer = true;

    // [실행] 버튼을 누르면 출력 값을 볼 수 있습니다.
    console.log('Hello Javascript')

    return answer;
}