function solution(t, p) {
    
    const lengthOfP = p.length;
    
    // p의 길이와 동일한 문자열의 배열
    const arr = [];
    
    // p의 길이와 동일한 길이로 t를 자르기 
    for(let i = 0; i < t.length-lengthOfP + 1; i++){
        const result = t.slice(i, (lengthOfP + i));
        
        
        
        arr.push(result);
    }
    
    console.log(arr);
    
    const filtered = arr.filter(item => Number(item) <= Number(p));
    
    console.log(filtered);
    
    var answer = filtered.length;
    return answer;
}