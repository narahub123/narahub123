function solution(n, lost, reserve) {
    // 학생 배열
    const students = Array.from({length: n}).map((_, i) => i + 1);
    
    let haveToBorrow = lost.filter(l => !reserve.includes(l));
    let canRent = reserve.filter(r => !lost.includes(r));
    console.log(canRent);
    
    // 체육복을 가지고 있는 학생들 
    const haveUniform = students.filter(s => {
        // 잃어버린 학생에 포함된 경우 (여분이 없는 경우)
        if(haveToBorrow.includes(s)){
            if(canRent.includes(s - 1)){
                canRent = canRent.filter(c => c !== s - 1);
                return true;
            // 다음 학생에게 빌릴 수 있는 경우
            } else if(canRent.includes(s + 1)){
                canRent = canRent.filter(c => c !== s + 1);
                return true;
            } else {
                // 빌릴 수 없는 경우
                return false;
            }
        } else {
            // 잃어버리지 않은 경우 
            return true;
        }
    })
    
    console.log(haveUniform);
    var answer = haveUniform.length;
    return answer;
}