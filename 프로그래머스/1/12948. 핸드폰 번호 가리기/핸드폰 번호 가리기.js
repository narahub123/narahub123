function solution(phone_number) {
    
    let length = phone_number.length;
    
    let lastFour = phone_number.slice(length-4);
    
    
    
    var answer = lastFour.padStart(length, "*");
    return answer;
}