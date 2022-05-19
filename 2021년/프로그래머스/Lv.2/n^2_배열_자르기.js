function solution(n, left, right) {
    let minRange = 1e8;
    let maxRange = 0;
    let idx = 0;
    let range = 0;
    while (minRange == 1e8 || maxRange == 0) {
        range = n * idx;
        if (minRange == 1e8 && range == left) {
            minRange = range;
        } else if (minRange == 1e8 && range > left) {
            minRange = n * (idx - 1);
        }
        
        if (maxRange == 0 && range == right) {
            maxRange = range;
        } else if (maxRange == 0 && range > right) {
            maxRange = n * idx;
        }
        idx += 1;
    }
    
    const subset = [];    
    const si = Math.floor(minRange / n);
    const ei = Math.floor(maxRange / n);
    for (let i = si; i <= ei; i++) {
        for (let j = 0; j < n; j++) {
            if (i >= j) {
                subset.push(i + 1);
            } else {
                subset.push(j + 1);
            }
        }
    }    
    const start = left - minRange;
    const end = right - minRange;
    const result = subset.slice(start, end + 1);    
    return result;
}
