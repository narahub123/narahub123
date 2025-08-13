function solution(food) {
    const orders = []
    for(let i = 1; i < food.length; i++){
        // 배치될 수 있는 음식의 개수 
        const result = Math.floor(food[i] / 2);
        
        orders.push(result);
    }
    
    console.log(orders);
    
    let answer = '';
    
    for (let j=0; j < orders.length; j++) {
        
        answer += String(j+1).repeat(orders[j])
    }
    
    answer += 0;
    
    for (let k= orders.length - 1; 0 <= k; k--) {
        
        answer += String(k+1).repeat(orders[k])
    }
    
    console.log("answer",answer);
    
    return answer;
}