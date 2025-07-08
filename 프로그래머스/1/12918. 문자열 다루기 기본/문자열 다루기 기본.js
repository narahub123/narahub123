function solution(s) {
    if(s.length !== 4 && s.length !== 6) return false;
    
    const split = s.split('');
    
    for(const num of split){
        if(num.match(/[^0-9]/)) return false;
    }
    
    
    var answer = true;
    return answer;
}