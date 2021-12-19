function getCombination(comb, order, n, start, prev) {
    if (n == prev.length) {
        const combItem = prev.sort().join('');
        if (!comb.has(combItem)) {
            comb.set(combItem, 1);
        } else {
            comb.set(combItem, comb.get(combItem) + 1);
        }
        return;
    }
    for (let idx = start; idx < order.length; idx++) {
        getCombination(comb, order, n, idx + 1, [...prev, order[idx]]);
    }
    return comb;
}

function solution(orders, course) {
    let comb = new Map();
    orders.forEach(order => {
        course.forEach(n => {
            comb = getCombination(comb, order, n, 0, []);
        });
    });
    
    comb = [...comb.entries()].filter(item => item[1] >= 2).sort((a, b) => a[0].length - b[0].length);
    
    let ret = [];
    course.forEach(n => {
        let maxValue = -1;
        const nComb = comb.filter(([k, v]) => {
            if (v > maxValue && k.length == n) {
               maxValue = v;
            }
            return k.length == n;
        });
        nComb.filter(([k, v]) => v == maxValue).forEach(item => ret.push(item[0]));
    });
    
    return ret.sort();
}
