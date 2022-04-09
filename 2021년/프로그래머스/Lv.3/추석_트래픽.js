const unit = 1000; // 0.001ms = 1

function getRangeFromLine(line) {
    let start = 0, end = 0;
    const [year, date, p] = line.split(' ');
    const [hh, mm, ssmmm] = date.split(':');
    const [ss, mmm] = ssmmm.split('.');

    end += parseInt(hh) * 3600;
    end += parseInt(mm) * 60;
    end += parseInt(ss);
    end = (end * unit) + parseInt(mmm);
    
    const pssmmm = p.replace('s', '');
    let pss, pmmm = null;
    if (pssmmm.includes('.')) {
        [pss, pmmm] = pssmmm.split('.');
        start = end - ( (parseInt(pss) * unit) + parseInt(pmmm) );
    } else {
        pss = pssmmm;
        start = end - ( (parseInt(pss) * unit) );
    }
    return [start, end];
}

function solution(lines) {
    let answer = 0;
    
    const ranges = [];
    lines.forEach(line => {
        const range = getRangeFromLine(line);
        ranges.push(range);
    });
    
    for (let i = 0; i < ranges.length; i++) { // 구간 범위들 끼리 겹치는지 비교
        let cnt = 0;
        const endTime = ranges[i][1];
        for (let j = i; j < ranges.length; j++) {
            const startTime = ranges[j][0] - 1000 + 1; // 초당 처리 단위 : 0.999s
            if (endTime > startTime) { // (내 현재 종료시간) > (다음 시작시간 - 초당 처리 단위)
                cnt += 1;
            }
        }
        answer = Math.max(answer, cnt);
    }
    return answer;
}
