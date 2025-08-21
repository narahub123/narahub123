function solution(k, m, score) {
    
    const reverseSortedScore = score.sort((a, b) => b -a );
    
    
    const boxArr = [];
    
    for(let i = 0; i < Math.floor((score.length) / m); i++){
        // 한 박스
        const box = reverseSortedScore.slice(m * i , m * (i + 1));
        
        // 박스에 들어간 사과의 개수가 m보다 작은 경우 제외
        if(box.length < m) return;
        
        boxArr.push(box);
    }

    
    const sum = boxArr.reduce((acc, cur) => {
        
        // 최소 값
        const min = cur[cur.length - 1];
        
        // box의 값 구하기 
        const value = min * m;
        
        return acc + value;
    }, 0);
    
    return sum;
}