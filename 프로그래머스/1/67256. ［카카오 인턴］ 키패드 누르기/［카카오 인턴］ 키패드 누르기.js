function solution(numbers, hand) {
    let leftPos = '*';
    const mustLeft = [1, 4, 7];
    
    let rightPos = "#";
    const mustRight = [3, 6, 9];
    
    let order = '';
    
    for(const num of numbers){
        if(mustLeft.includes(num)){
            leftPos = num;
            order += 'L';
        } else if(mustRight.includes(num)){
            rightPos = num;
            order += "R";
        } else {
            console.log('숫자', num);
            // 거리 구하는 방법 
            const leftDist = calcDist(num, leftPos);
            const rightDist = calcDist(num, rightPos);
            
            if(leftDist < rightDist){
                leftPos = num;
                order += 'L';
            } else if(leftDist > rightDist){
                rightPos = num;
                order += "R";
            } else {
                if(hand === 'left'){
                    leftPos = num;
                    order += 'L';
                } else {
                    rightPos = num;
                    order += "R";
                }
            }
        }
    }
    
    return order;
    
    
}

const KEYS = "123456789*0#";

const toRC = (key) => {
  const i = KEYS.indexOf(String(key)); // key는 1~9, 0, '*', '#'
  if (i < 0) throw new Error(`Invalid key: ${key}`);
  return [Math.floor(i / 3), i % 3];   // [row, col]
};

const calcDist = (a, b) => {
  const [r1, c1] = toRC(a);
  const [r2, c2] = toRC(b);
  return Math.abs(r1 - r2) + Math.abs(c1 - c2);
};