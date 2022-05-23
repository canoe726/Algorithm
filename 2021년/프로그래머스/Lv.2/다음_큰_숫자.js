function getBinary (n) {
    let binary = [];
    while (n > 0) {
        const mod = n % 2;
        binary.push(mod);
        n = Math.floor(n / 2);
    }
    return binary.reverse();
}

function getNum (binary) {
    let num = 0;
    let two = 1;
    for (let i = binary.length - 1; i >= 0; i--) {
        num += (binary[i] * two);
        two *= 2;
    }
    return num;
}

function getCntOne (n) {
    let cnt = 0;
    while (n > 0) {
        n &= n - 1;
        cnt += 1;
    }
    return cnt;
}

function solution(n) {
    let answer = 0;
    let nCnt = getCntOne(n);
    while (true) {
        n += 1;
        const nextCnt = getCntOne(getNum(getBinary(n)));
        if (nCnt == nextCnt) {
            break;
        }
    }    
    return n;
}
