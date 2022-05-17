function getDiff (a, b, score) {
    const size = a.length;
    let [aScore, bScore] = [0, 0];
    for (let i = 0; i < size; i++) {
        if (b[i] > a[i]) {
            bScore += score[i];
        } else if (a[i] > 0) {
            aScore += score[i];
        }
    }
    return bScore - aScore;
}

function getBetterThanA (a, b) {
    const size = a.length;
    let isBetter = false;
    for (let i = size - 1; i >= 0; i--) {
        if (a[i] < b[i]) {
            isBetter = true;
            break;
        } else if (a[i] > b[i]) {
            break;
        }
    }
    return isBetter;
}

function combintaionWithRep (num, pick, apeach) {
    let answer = Array.from({ length: num.length }, () => 0);
    let maxDiff = -1;

    function getCombWithRep (ryan, idx, left) {
        if (left <= 0) {
            const diff = getDiff(apeach, ryan, num);
            if (diff > 0 && diff >= maxDiff) {
                if (diff == maxDiff && !getBetterThanA(answer, ryan)) return;
                maxDiff = diff;
                answer = ryan.slice();
            }
            return;
        }
        for (let i = idx; i < num.length; i++) {
            ryan[(num.length - 1) - num[i]] += 1;
            getCombWithRep(ryan, i, left - 1);
            ryan[(num.length - 1) - num[i]] -= 1;
        }
    }
    const bScore = Array.from({ length: num.length }, () => 0);
    getCombWithRep(bScore, 0, pick);
    let zeroCnt = 0;
    for (let i = 0; i < answer.length; i++) {
        if (answer[i] == 0) {
            zeroCnt += 1;
        }
    }
    if (zeroCnt == answer.length) {
        answer = [-1];
    }
    return answer;
}

function solution(n, info) { // a: 어피치, b: 라이언
    const score = Array.from({ length: info.length }, (_, i) => i).reverse();
    return combintaionWithRep(score, n, info);
}
