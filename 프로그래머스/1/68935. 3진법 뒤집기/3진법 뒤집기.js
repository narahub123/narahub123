function solution(n) {
    
    let ternary = [];
    let share = n;

    do {
        const remainder = share % 3;
        ternary.push(remainder);
        share = Math.floor(share / 3);
    } while (share > 0);

    let sum = 0;
    for (let i = 0; i < ternary.length; i++) {
        sum += ternary[i] * Math.pow(3, ternary.length - i - 1);
    }
    
    var answer = sum;
    return answer;
}