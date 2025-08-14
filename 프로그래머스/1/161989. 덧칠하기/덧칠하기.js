function solution(n, m, section) {
    var answer = 0;
    
    // 기준점
    let curIndex = 0;
    
    let counter = 0;
    
    for(let i = 0; i < section.length; i++){
        
        // 현재 위치
        const point = section[i];
        
        // 기준점보다 작으면 검사 안함
        if(point < curIndex) continue;
        
        
        counter++;
        
        curIndex = point + m;
        
    }
    
    console.log(curIndex);
    console.log(counter);
    return counter;
}