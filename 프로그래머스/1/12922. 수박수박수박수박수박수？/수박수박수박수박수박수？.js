function solution(n) {
    
    let result = '';
   
    let i = 0;
    
    while(i < n){
        
        if(i % 2 === 0){
            result += "수";
        } else {
            result += "박";
        }
        
        
        i++;
    }
    
    var answer = result;
    return answer;
}