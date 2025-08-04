function solution(name, yearning, photo) {
    
    // name과 yearning 맵핑 
    const kv = Object.fromEntries(name.map((n, idx)=> ([n, yearning[idx]])));
 
    // kv의 key 값에 대응되는 값을 더해줌, 없으면 0
    console.log(kv);
    
    var answer = [];
    
    for(const arr of photo){
        
        const sum = arr.reduce((acc, cur) => acc + (kv[cur] ?? 0), 0);
        
        answer.push(sum);
    }
    
    
    return answer;
}