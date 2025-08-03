function solution(cards1, cards2, goal) {
    
    let answer = "Yes";
    
    for(let i = 0; i < goal.length; i++){
        // 확인할 단어
        const word = goal[i];
        
        // 두 카드 덱에서 확인할 단어가 처음으로 존재하는 여부 확인 
        const isExisting = word === cards1[0] || word === cards2[0]
        
        
        if(!isExisting) {
            answer = "No";
            break;
        }
        
        if(word === cards1[0]){
            cards1.splice(0, 1);
        } else {
            cards2.splice(0, 1);
        }
    }
    
    
    console.log(answer);
    
    return answer;
}