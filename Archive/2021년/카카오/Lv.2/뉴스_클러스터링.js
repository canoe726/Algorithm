function onlyAlpha (str) {
    return str.match(/^[a-z]+$/);
}

function solution(str1, str2) {
    let answer = 0;
    
    const s1 = str1.toLowerCase();
    const s2 = str2.toLowerCase();
    
    const obj1 = {};
    const obj2 = {};
    
    let obj1Size = 0;
    let obj2Size = 0;
    for (let i = 0; i < s1.length - 1; i ++) {
        const word = s1.slice(i, i + 2);
        if (onlyAlpha(word)) {
            if (word in obj1) {
                obj1[word] += 1;
            } else {
                obj1[word] = 1;
                obj1Size += 1;
            }
        }
    }
    for (let i = 0; i < s2.length - 1; i ++) {
        const word = s2.slice(i, i + 2);
        if (onlyAlpha(word)) {
            if (word in obj2) {
                obj2[word] += 1;
            } else {
                obj2[word] = 1;
                obj2Size += 1;
            }
        }
    }
    
    let intersection = 0;
    const interKeys = [];
    let union = 0;
    
    const ent1 = (obj1Size > obj2Size) ? Object.entries(obj2) : Object.entries(obj1); // 작은 집합
    const ent2 = (obj1Size > obj2Size) ? Object.entries(obj1) : Object.entries(obj2); // 큰 집합
    
    ent1.forEach(([k, v]) => {
        const ent2Idx = ent2.findIndex(([_k, _v]) => k == _k);
        if (ent2Idx >= 0) {
            interKeys.push(k);
            const value = (ent2[ent2Idx][1] > v) ? v : ent2[ent2Idx][1];
            intersection += value;
        }
    });
    
    ent1.forEach(([k, v]) => {
        const ent2Idx = ent2.findIndex(([_k, _v]) => k == _k);
        if (ent2Idx >= 0) {
            const value = (ent2[ent2Idx][1] > v) ? ent2[ent2Idx][1] : v;
            union += value;
        }
    });
    ent1.forEach(([k, v]) => {
        if (interKeys.indexOf(k) < 0) {
            union += v;
        }
    });
    ent2.forEach(([k, v]) => {
        if (interKeys.indexOf(k) < 0) {
            union += v;
        }
    });
    
    if (intersection == 0 && union == 0) {
        return 65536;
    }
    return Math.floor((intersection / union) * 65536);
}
