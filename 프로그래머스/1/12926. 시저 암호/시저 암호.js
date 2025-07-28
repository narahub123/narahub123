function solution(s, n) {
    // 문자열을 문자로 분리한 문자 배열
    const chars = s.split("");
    
//     console.log(chars)
    
//     console.log("A의 아스키 코드", 'A'.charCodeAt(0));
    
//     console.log("Z의 아스키 코드", 'Z'.charCodeAt(0));
    
    // 문자를 ASCII코드로 변경한 배열
    const codes = chars.map(c => c.charCodeAt(0));
    
    // console.log(codes);
    // c === 32 ? 32 : c > 64 && c < 98 && c + n > 90 && c + n < 97 ? 65 + (c + n) - 90 - 1 : c + n > 122 ? 97 + (c + n - 122) -1 :c + n
    
    // ASCII 코드를 n만큼 이동 
    const moved = codes.map(c => {
        if(64 < c && c < 91){
            return c + n > 90 ? 65 + (c + n) - 90 -1 : c + n;
        } else if (96 < c && c < 123){
           return c + n > 122 ? 97 + (c + n) - 122 -1 : c + n 
        } else {
            return 32
        }
    });
    
    // console.log(moved);
    
    // 이동한 코드를 다시 문자로 변경 
    const convertedToChars = moved.map(m => String.fromCharCode(m));
    
    // console.log(convertedToChars);
    
    // 문자 합치키
    console.log(convertedToChars.join(""));
    
    var answer = convertedToChars.join("");
    
    return answer;
}