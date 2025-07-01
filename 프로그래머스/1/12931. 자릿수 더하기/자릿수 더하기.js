function solution(n)
{
    const str = String(n);
    
    const splitStr = str.split("")
    
    let sum = 0;
    
    splitStr.forEach(digit => sum += Number(digit))
    
    console.log(sum)
    
    

    return sum;
}