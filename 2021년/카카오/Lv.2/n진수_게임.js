const hex = ['A', 'B', 'C', 'D', 'E', 'F'];

function getNary (number, n) {
    const result = [];
    if (number == 0) {
        return [0];
    }
    while (number > 0) {
        const next = number % n;
        if (next >= 10) {
            result.push(hex[next % 10]);
        } else {
            result.push(next);
        }
        number = Math.floor(number / n);
    }
    return result.reverse();
}

function solution(n, t, m, p) {
    let answer = [];
    let number = 0;
    let curTurn = 0;
    while (true) {
        const result = getNary(number, n);
        for (let i = 0; i < result.length; i++) {
            if (curTurn == (p - 1)) {
                const item = result[i];
                answer.push(item);
                if (answer.length == t) {
                    return answer.join('');
                }
            }
            curTurn += 1;
            if (curTurn >= m) {
                curTurn = 0;
            }
        }
        number += 1;
    }
    return answer.join('');
}
