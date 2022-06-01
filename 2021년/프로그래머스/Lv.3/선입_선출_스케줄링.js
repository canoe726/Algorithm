function solution(n, cores) {
    var answer = 0;
    const coreSize = cores.length;
    n -= coreSize;

    let minTime = 0;
    let maxTime = 1e9;
    let handleTask = 0;
    while (minTime < maxTime) {
        handleTask = 0;
        let curTime = Math.floor((minTime + maxTime) / 2);
        
        for (let i = 0; i < cores.length; i++) {
            const t = Math.floor(curTime / cores[i]);
            handleTask += t;
        }
        if (handleTask < n) {
            minTime = curTime + 1;
        } else {
            maxTime = curTime;
        }
    }
    let prevTask = 0;
    for (let i = 0; i < cores.length; i++) {
        const t = Math.floor((maxTime - 1) / cores[i]);
        prevTask += t;
    }
    
    for (let i = 0; i < cores.length; i++) {
        if (maxTime % cores[i] == 0) {
            prevTask += 1;
            if (prevTask == n) {
                return i + 1;
            }
        }
    }
    
    return answer;
}
