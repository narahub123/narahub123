function solution(N, stages) {
    // 오름차순 정렬
    const sortedStages = stages.sort((a, b) => a - b);
    
    // 각 단계당 시도횟수 
    const ratios = [];
    
    for(let s = 1; s < N + 1; s++){
        
        const attempt = stages.reduce((acc, cur) => cur >= s ? acc += 1 : acc, 0);
        const trial = stages.reduce((acc, cur) => cur === s ? acc += 1 : acc, 0); 
        const ratio = trial / attempt
        
        ratios.push({stage: s, failure: ratio});
    }
    
    console.log(ratios);

    const order = ratios.sort((a, b) => b.failure - a.failure).map(r => r.stage);
    
   
    return order;
}