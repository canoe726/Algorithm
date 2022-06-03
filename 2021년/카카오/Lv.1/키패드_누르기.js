const num = [[3,1], [0,0], [0,1], [0,2], [1,0], [1,1], [1,2], [2,0], [2,1], [2,2]];

function getDist (y1, x1, y2, x2) {
    return Math.abs(y2 - y1) + Math.abs(x2 - x1);
}

function solution(numbers, hand) {
    let answer = [];
    let lPos = [3, 0], rPos = [3, 2]; // [y, x]
    
    numbers.forEach(number => {
        if (number == 1 || number == 4 || number == 7) {
            lPos = num[number];
            answer.push('L');
        } else if (number == 3 || number == 6 || number == 9) {
            rPos = num[number];
            answer.push('R');
        } else {
            const d1 = getDist(lPos[0], lPos[1], num[number][0], num[number][1]); // L
            const d2 = getDist(rPos[0], rPos[1], num[number][0], num[number][1]); // R
            
            if (d1 > d2) {
                rPos = num[number];
                answer.push('R');
            } else if (d1 < d2) {
                lPos = num[number];
                answer.push('L');
            } else {
                if (hand == 'left') {
                    lPos = num[number];
                    answer.push('L');
                } else {
                    rPos = num[number];
                    answer.push('R');
                }
            }
        }
    });
    
    return answer.join('');
}
