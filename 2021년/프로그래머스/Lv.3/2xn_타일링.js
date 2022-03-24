// let countList = [];
// let count = 0;

function recursive(n) {
    if (n == 0) {
        count += 1;
        return;
    }
    if (n >= 2) {
        n -= 2;
        recursive(n);
        n += 2;
    }
    if (n >= 1) {
        n -= 1;
        recursive(n);
        n += 1;
    }
}

function solution(n) {
    let answer = 0;
    const div = 1000000007;
    let countList = [];
    countList[0] = 1;
    countList[1] = 2;
    
    // 점화식 구하기
    // for (let i = 1; i <= 10; i++) {
    //     count = 0;
    //     recursive(i);
    //     countList.push(count);
    // }    
    for (let i = 2; i <= 60000; i++) {
        countList[i] = (countList[i - 1] + countList[i - 2]) % div;
    }
    return countList[n - 1];
}
