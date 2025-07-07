function solution(num) {
    let counter = 0;
    
    let target = num;
    
    while(target !== 1){
        
        if(target % 2 === 0){
            target /= 2;
        } else {
            target = target * 3 + 1;
        }
        
        counter += 1;
    }
    
    
    
    var answer = counter <= 500 ? counter : -1;
    return answer;
}