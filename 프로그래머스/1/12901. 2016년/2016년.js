function solution(a, b) {
    const days = ['SUN','MON','TUE','WED','THU','FRI','SAT']
    
    const date = new Date(2016, a -1, b);
    
    const day  = days[date.getDay()];
    
    
    var answer = day;
    return answer;
}