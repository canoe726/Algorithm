function getCombination (cases, pick) {
    const comb = [];
    function getComb (num, start) {
        if (num.length == pick) {
            comb.push(num);
            return;
        }
        for (let i = start; i < cases.length; i++) {
            const nextNum = num.slice();
            nextNum.push(cases[i]);
            getComb(nextNum, i + 1);
        }
    }
    getComb([], 0);
    return comb;
}

function solution(relation) {
    const candidate = [];
    const containsAll = (arr, target) => (target.every(item => arr.includes(item)));
    const colSize = relation[0].length;
    const cases = Array.from({ length: colSize }, (_, idx) => idx);
    let combination = [];
    for (let i = 1; i <= colSize; i++) {
        const comb = getCombination(cases, i);
        combination = [...combination, ...comb];
    }
    
    for (let i = 0; i < combination.length; i++) {
        const comb = combination[i];
        let isValid = true;
        
        for (let j = 0; j < candidate.length; j++) { // 최소성
            const cand = candidate[j];
            if (containsAll(comb, cand)) {
                isValid = false;
            }
        }
        
        const rows = [];
        for (let r = 0; r < relation.length; r++) { // 유일성
            let row = '';
            const curRelation = relation[r];
            for (let cR = 0; cR < curRelation.length; cR++) {
                if (comb.indexOf(cR) >= 0) {
                    row += curRelation[cR];
                }
            }
            rows.push(row);
        }
        const set = [...new Set(rows)];
        if (rows.length != set.length) {
            isValid = false;
        }
        
        if (isValid) {
            candidate.push(comb);
        }
    }
    return candidate.length;
}
