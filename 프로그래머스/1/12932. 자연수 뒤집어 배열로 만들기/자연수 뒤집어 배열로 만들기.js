function solution(n) {
    
    
    const str = String(n).split("");

        const reverse = str.reverse().map(i => Number(i));
    
    console.log(reverse)
    return reverse;
}