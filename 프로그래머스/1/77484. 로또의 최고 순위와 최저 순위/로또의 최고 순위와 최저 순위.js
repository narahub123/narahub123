function solution(lottos, win_nums) {
    
    console.log(lottos);
    
    const countZero = lottos.filter(l => l === 0).length;
    
    let matches = 0;
    
    console.log(win_nums);
    
    console.log(lottos.filter(m => m !== 0))
    
    lottos.forEach(l => {
        if(win_nums.includes(l)){
            matches++;
        };
    })
    
    console.log("일치개수", matches);
    
    const rank = 6 - (matches > 1 ? matches - 1 : 0);
    
    console.log(rank);
    
    const high = rank - countZero > 0 ? rank - countZero : 1;
    const low = rank;
    
    console.log(high, low);
    
    var answer = [high, low];
    return answer;
}