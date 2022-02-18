function getScore(numOfSame) {
    if (numOfSame == 6) {
        return 1;
    } else if (numOfSame == 5) {
        return 2;
    } else if (numOfSame == 4) {
        return 3;
    } else if (numOfSame == 3) {
        return 4;
    } else if (numOfSame == 2) {
        return 5;
    } else {
        return 6;
    }
}

function solution(lottos, win_nums) {
    let numOfSame = 0;
    let zeroCnt = 0;
    
    lottos.forEach(lotto => {
        if (lotto > 0) {
            win_nums.forEach(win_num => {
                if (lotto == win_num) {
                    numOfSame += 1;
                }
            });
        } else {
            zeroCnt += 1;
        }
    });
    
    return [getScore(numOfSame + zeroCnt), getScore(numOfSame)];
}
