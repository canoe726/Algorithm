function isDigit (ch) {
    return ch.match(/[0-9]/);
}

function solution(dartResult) {
    const scores = [];

    let scoreIdx = 0;
    let score = '';
    let bouns = 0;
    for (let i = 0; i < dartResult.length; i++) {
        const ch = dartResult.charAt(i);
        if (isDigit(ch)) {
            score += ch;
        } else if (ch == 'S' || ch == 'D' || ch == 'T') {
            bouns = 1;
            if (ch == 'D') {
                bouns = 2;
            } else if (ch == 'T') {
                bouns = 3;
            }
            score = parseInt(score);
            score = Math.pow(score, bouns);
            scores.push(score);
            score = '';
            scoreIdx = scores.length - 1;
        } else if (ch == '*' || ch == '#') {
            if (ch == '*') {
                for (let j = -1; j <= 0; j++) {
                    const nextIdx = scoreIdx + j;
                    if (nextIdx >= 0) {
                        scores[nextIdx] *= 2;
                    }
                }
            } else {
                scores[scoreIdx] *= -1;
            }
        }
    }
    return scores.reduce((acc, cur) => acc + cur, 0);
}
