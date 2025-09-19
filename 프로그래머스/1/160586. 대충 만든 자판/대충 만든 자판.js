function solution(keymap, targets) {
    
    const sums = [];
    
    for(const target of targets){
        sums.push(calcDistance(keymap, target));
    }
    
    
    return sums;
}

const calcDistance = (keymap, target) => {
    let sum = 0;
    
    for(const letter of target.split("")){
        const min = getMinLoc(letter, keymap);
        if (min === -1) return -1; 
        sum += min;
    }
    
    return sum;
}

// 최소 위치 찾기 
const getMinLoc = (letter, keymap) => {
    
    const locs = [];
    
    // 각 맵에서의 위치
    for (const map of keymap){
        const loc = map.indexOf(letter);
        
        locs.push(loc);
    }
    
    // 각 맵의 위치에서 -1 인 경우 필터링 
    const filtered = locs.filter(l => l !== -1);

    // 최소값이 Infinity인 경우 -1 그 외에는 최소 값  + 1
    return Math.min(...filtered) === Infinity ? -1 : Math.min(...filtered) + 1;
}