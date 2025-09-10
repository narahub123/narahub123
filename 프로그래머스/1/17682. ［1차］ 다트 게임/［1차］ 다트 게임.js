function solution(dartResult) {
    let result = [];
    
    // 단계별로 추출 
    const stages = dartResult.match(/\d+[a-zA-Z*#]+/g);
    console.log(stages);
    
    // 단계별로 계산 
    for(let i = 0; i < stages.length; i++){
        const stage = stages[i];
        
        const parts = stage.match(/[A-Z]+|\d+|[*#]+/g).map(p => {
            const convert = Number(p)
            if(Number.isNaN(convert)) return p;
            else return convert;
        });
        
        console.log(parts);
        
        const num = Number(parts[0]);
        const rest = parts.slice(1);

        const sum = rest.reduce((acc, cur) => {
            switch(cur) {
                case "S":
                    return Math.pow(acc, 1);
                case "D":
                    return Math.pow(acc, 2);
                case "T":
                    return Math.pow(acc, 3);
                case "*":
                    if(result[i-1]){
                        result.splice(i-1, 1, result[i-1] * 2)    
                    }
                    return acc * 2;
                case "#":
                    return acc * -1;
                default:
                    return acc; // 예상치 못한 값은 그대로
            }
        }, num);
        
        console.log(sum);
        
        result.push(sum);

    }
    

    
    var answer = result.reduce((acc, cur) => acc += cur);
    return answer;
}

