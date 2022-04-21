function getTime (time) {
    const [hh, mm, ss] = time.split(':');
    let wholeTime = 0;
    wholeTime += parseInt(hh) * 3600;
    wholeTime += parseInt(mm) * 60;
    wholeTime += parseInt(ss);
    return wholeTime;
}

function getClock (time) {
    let myTime = time;
    const hh = Math.floor(myTime / 3600);
    myTime -= 3600 * hh;
    const chh = hh >= 10 ? `${hh}` : `0${hh}`;
    
    const mm = Math.floor(myTime / 60);
    myTime -= 60 * mm;
    const cmm = mm >= 10 ? `${mm}` : `0${mm}`;

    const ss = myTime;
    const css = ss >= 10 ? `${ss}` : `0${ss}`;
          
    return `${chh}:${cmm}:${css}`;
}

function solution (play_time, adv_time, logs) {
    let answer = 0;
    const playTime = getTime(play_time);
    const advTime = getTime(adv_time);
    const maxTime = playTime + 2; // 99h 59m 59s = 359999
    let sum = Array.from({ length: maxTime }, () => 0);
    
    logs.forEach(log => {
        const [start, end] = log.split('-');
        const startTime = getTime(start);
        const endTime = getTime(end);
        sum[startTime] += 1;
        sum[endTime] -= 1;
    });
    
    for (let i = 1; i <= playTime; i++) {
        sum[i] += sum[i - 1];
    }
    for (let i = 1; i <= playTime; i++) {
        sum[i] += sum[i - 1];
    }
    
    let rangeSum = sum[advTime];
    for (i = advTime + 1; i <= playTime; i++) {
        const nextRangeSum = sum[i] - sum[i - advTime];
        if (nextRangeSum > rangeSum) {
            rangeSum = nextRangeSum;
            answer = i - advTime + 1;
        }
    }
    return getClock(answer);
}
