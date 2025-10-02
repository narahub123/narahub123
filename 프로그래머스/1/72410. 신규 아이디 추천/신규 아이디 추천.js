function solution(new_id) {
    // 1단계 : 소문자로 치환 
    const lowerCase = new_id.toLowerCase();
    
    // console.log("소문자", lowerCase);
    
    // 2단계 : 문자 분류 - 소문자, 숫자, -, _, .을 제외하고 제거 (정규 표현식)
    // 소문자, 숫자, -_.이 아닌 문자열을 빈문자열로 대체
    const regex = /[^0-9a-z\-\_\.]/g;
    
    const removed = lowerCase.replace(regex, '');
    
    // console.log("제거", removed);
    
    // 3단계 : .. 연속되는 경우 .로 대체 
    const dotRegex = /\.{2,}/g;
    const replaced = removed.replace(dotRegex,'.');
    
    // console.log('연속 점 대체', replaced);
    // 4단계 : .이 처음과 끝에 오는 경우 제거
    const dotLocRegex = /^\.|\.$/g;
    const withoutDot = replaced.replace(dotLocRegex, '');
    
    // console.log('시작점 종료점 삭제', withoutDot);
    
    // 5단계 : 빈 문자열인 경우 a 추가 
    // 빈 문자열 검출을 위한 정규 표현식 
    // length를 이용한 빈 문자열 
    let noEmpty = withoutDot;
    
    if(noEmpty.length < 1){
        noEmpty = "a";
    }
    
    // console.log("빈문자열 대체", noEmpty);
    
    // 6단계 : 16자 이상의 경우 15자만 사용 
    // 15자의 마지막이 .인경우 제거 
    let limitLength = noEmpty.slice(0, 15); // 15자리 까지만 사용
    limitLength = limitLength.endsWith('.') ? limitLength.slice(0, 14) : limitLength;
    
    // console.log("자리수 확인", limitLength);
    
    // 7단계 : 2자 이하인 경우 마지막 문자열 반복
    const length = limitLength.length
    const repeat = length < 3 ? limitLength + limitLength[length - 1].repeat(3-length) : limitLength;
    
    
    var answer = repeat;
    return answer;
}