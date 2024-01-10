// (n+10)Cn, 20C10 = 184756
function getCombWithRep (size, pick) {
    const combs = [];
    const nums = Array.from({ length: size }, () => 0);
    function getComb (index, depth) {
        if (depth == pick) {
            combs.push(nums.slice());
            return;
        }
        for (let i = index; i < nums.length; i++) {
            nums[i] += 1;
            getComb(i, depth + 1);
            nums[i] -= 1;
        }
    }
    getComb(0, 0);
    return combs;
}

function solution(n, info) {
    let answer = [];
    let result = [];
    const size = info.length;
    const score = [10, 9, 8, 7, 6, 5, 4, 3, 2, 1, 0];
    let maxScoreGap = 0;
    const compRep = getCombWithRep(size, n);
    compRep.forEach(comb => {
        let apeach = 0;
        let ryan = 0;
        for (let i = 0; i < size; i++) {
            if (comb[i] > info[i]) {
                ryan += score[i];
            } else {
                if (info[i] > 0) {
                    apeach += score[i];
                }
            }
        }
        if (ryan > apeach) {
            const diff = ryan - apeach;
            if (diff > maxScoreGap) {
                maxScoreGap = diff;
            }
            result.push({
                comb: comb,
                score: diff,
            });
        }
    });
    
    if (result.length == 0) {
        return [-1];
    } else {
        result = result.filter(item => item.score == maxScoreGap);
        result = result.map(item => item.comb);        
        for (let i = size - 1; i >= 0; i--) {
            let maxLast = 0;
            for (let j = 0; j < result.length; j++) {
                const last = result[j][i];
                if (last > maxLast) {
                    maxLast = last;
                }
            }
            result = result.filter(item => item[i] == maxLast);
            if (result.length == 1) {
                return result[0];
            }
        }
    }    
    return [-1];
}
