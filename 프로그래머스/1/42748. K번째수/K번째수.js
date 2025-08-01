function solution(array, commands) {
    
    var answer = [];
    
    for(const command of commands){
        const start = command[0] -1;
        const end = command[1];
        const pickNum = command[2] -1;
        
        
        
        const arr = array.slice(start, end).sort((a,b)=> a-b);
        
        
        const picked = arr[pickNum];
        
        answer.push(picked);
    }
    
    
    return answer;
}