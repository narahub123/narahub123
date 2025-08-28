function solution(n, arr1, arr2) {
    
    const binaries1 = [];
    const binaries2 = [];
    
    for(const elem1 of arr1){
        // 자리수에 맞는 이진법으로 변환 
        const binary = elem1.toString(2).padStart(n, "0");
        
        binaries1.push(binary);
    }
    
    for(const elem2 of arr2){
        // 자리수에 맞는 이진법으로 변환 
        const binary = elem2.toString(2).padStart(n, "0");
        
        binaries2.push(binary);
    }
    
    
    let map = []
    for (let i = 0; i < arr1.length; i++) {
        const binary1 = binaries1[i];
        const binary2 = binaries2[i];
        
        let conbined = "";
        
        for (let j = 0; j < n ; j++) {
            if (binary1[j] === '1' || binary2[j] === '1') {
                conbined += "#";        
            } else {
                conbined += " ";
            }
        }
        
        map.push(conbined);
        
    }
    
    
    var answer = map;
    return answer;
}