// 2*(10^9) / 1 * 2*(10^5) + 10^5
// 4*(10^14) + 10^5
const maxTime = 4*10e14+10e5;

function bs(a, b, g, s, w, t, totalTime) {
    let gold = 0;
    let sliver = 0;
    let total = 0;
    
    let len = g.length;
    for (let i = 0; i < len; i++) {
        let oneWay = t[i];
        let round = t[i] * 2;
        let maxMove = Math.floor(totalTime / round);
        if (totalTime % round >= oneWay) {
            maxMove += 1;
        }
        let maxWeight = maxMove * w[i];
        gold += Math.min(g[i], maxWeight);
        sliver += Math.min(s[i], maxWeight);
        total += Math.min(g[i] + s[i], maxWeight);
    }
    if (gold >= a && sliver >= b && total >= a + b) {
        return true;
    } else {
        return false;
    }
}

function solution(a, b, g, s, w, t) {
    let answer = 0;
    let start = 1;
    let end = maxTime;
    while (start <= end) {
        const mid = Math.floor((start + end) / 2);
        if (bs(a, b, g, s, w, t, mid)) {
            answer = mid;
            end = mid - 1;
        } else {
            start = mid + 1;
        }
    }
    return answer;
}
