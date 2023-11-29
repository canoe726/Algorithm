function getTimeToNumber (time) {
    let [hh, mm, ss] = time.split(':');
    hh = Number(hh) * 3600;
    mm = Number(mm) * 60;
    ss = Number(ss);
    return hh + mm + ss;
}

function getNumberToTime (num) {
    let hh, mm, ss;
    hh = Math.floor(num / 3600);
    num = num % 3600;
    if (hh < 10) {
        hh = `0${hh}`;
    }
    mm = Math.floor(num / 60);
    num = num % 60;
    if (mm < 10) {
        mm = `0${mm}`;
    }
    ss = num;
    if (ss < 10) {
        ss = `0${ss}`;
    }
    return `${hh}:${mm}:${ss}`;
}

function solution(play_time, adv_time, logs) {
    let answer = '';
    
    const playTime = getTimeToNumber(play_time);
    const advTime = getTimeToNumber(adv_time);
    const acc = Array.from({ length: playTime + 1 }, () => 0);
    logs.forEach(log => {
        const [start, end] = log.split('-');
        acc[getTimeToNumber(start)] += 1;
        acc[getTimeToNumber(end)] -= 1;
    });
    for (let t = 1; t < playTime; t++) {
        acc[t] += acc[t - 1];
    }
    for (let t = 1; t < playTime; t++) {
        acc[t] += acc[t - 1];
    }
    
    let startTime = 0;
    let sum = acc[advTime - 1];
    for (let t = advTime - 1; t < playTime; t++) {
        const cost = (t - advTime < 0) ? acc[t] : acc[t] - acc[t - advTime]
        if (sum < cost) {
            sum = cost;
            startTime = t - advTime + 1;
        }
    }
    answer = getNumberToTime(startTime);
    return answer;
}
