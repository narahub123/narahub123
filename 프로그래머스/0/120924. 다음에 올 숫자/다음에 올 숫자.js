function solution(common) {
    
    let diff = 0;
    let isPlus = false;
    
    if(common[1] - common[0] === common[2] - common[1]){
        isPlus = true
        diff = common[1] - common[0]
    } else {
        isPlus = false
        diff = common[1] / common[0]
    }
    
    const last = common[common.length - 1];
    
    
    
    
    let answer = isPlus ? last + diff : last * diff;
    
    return answer;
}