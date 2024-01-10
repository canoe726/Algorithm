function getRange (hhmmssdd, range) {
    let [hh, mm, s] = hhmmssdd.split(':');
    let [ss, dd] = s.split('.');
    hh = Number(hh);
    mm = Number(mm);
    ss = Number(ss);
    dd = Number(dd);

    let [rs, rdd] = range.replace('s', '').split('.');
    rs = Number(rs);
    rdd = Number(rdd);
    if (rdd) {
        range = (rs * 1000) + rdd;
    } else {
        range = (rs * 1000);
    }
    const end = (hh * 60 * 60 * 1000) + (mm * 60 * 1000) + (ss * 1000) + dd;
    const start = (end - range + 1) > 0 ? (end - range + 1) : 0;
    return [Number(start), Number(end)];
}

function solution(lines) {
    const interval = [];
    const newLines = [];
    lines.forEach(line => {
        const [yyyy, hhmmssdd, range] = line.split(' ');
        newLines.push(getRange(hhmmssdd, range)); // [시작, 끝]
    });
    
    let maxTasks = 1;
    let tasks;
    for (let i = 0; i < newLines.length - 1; i++) {
        const [ls, le] = newLines[i];
        tasks = 1;
        for (let j = i + 1; j < newLines.length; j++) {
            const [rs, re] = newLines[j];            
            if ((rs - le + 1) <= 1000) {
                tasks += 1;
            }
        }
        if (tasks > maxTasks) {
            maxTasks = tasks;
        }
    }    
    return maxTasks;
}
