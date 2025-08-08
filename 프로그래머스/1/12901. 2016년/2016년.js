function solution(a, b) {
    const date = new Date(2016, a -1, b);
    
    
    
    
    var answer = date.toString().slice(0, 3).toUpperCase();
    return answer;
}