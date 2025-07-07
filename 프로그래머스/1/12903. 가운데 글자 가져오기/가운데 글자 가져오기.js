function solution(s) {
    
    const length = s.length;
    
    let middle = "";
    
    if(length % 2 !== 0){
        const num = Math.floor(length / 2);
        middle = s[num]
    } else {
        const num = Math.floor(length / 2)
        middle += s[num - 1];
        middle += s[num];
    }
    
    var answer = middle;
    return answer;
}