function solution(answers) {
    console.log(answers);
    const su1 = [1, 2, 3, 4, 5];
    const su2 = [2, 1, 2, 3, 2, 4, 2, 5];
    const su3 = [3, 3, 1, 1, 2, 2, 4, 4, 5, 5];
    
    let su1Count = 0;
    let su2Count = 0;
    let su3Count = 0;
    
    
    
    for(let i = 0; i < answers.length; i++){
        if(answers[i] === su1[i % su1.length]){
            su1Count++;
        }
        if(answers[i] === su2[i % su2.length]){
            su2Count++;
        }
        if(answers[i] === su3[i % su3.length]){
            su3Count++;
        }
    }
    
    const suCounts = [su1Count, su2Count, su3Count]
    const winnerPoint = Math.max(...suCounts);
    
    const winners = [];
    
    for(let j = 0; j < suCounts.length; j++){
        if(suCounts[j] === winnerPoint){
            winners.push(j+1);
        }
    }
    
    return winners;
}