function solution(arr)
{
    var answer = [];
    
    for(const item of arr){
        if(answer[answer.length-1] === item){
            continue
        } 
        
        answer.push(item);
    }

    
    
    return answer;
}