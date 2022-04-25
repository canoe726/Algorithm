function getClock(t) {
    let time = t;
    const hh = Math.floor(time / 3600);
    const shh = hh >= 10 ? hh : `0${hh}`;
    time -= 3600 * hh;
    const mm = Math.floor(time / 60);
    const smm = mm >= 10 ? mm : `0${mm}`;
    return `${shh}:${smm}`;
}

function getTime(time) {
    const [hh, mm] = time.split(':');
    let totalTime = 0;
    totalTime += hh * 3600;
    totalTime += mm * 60;
    return totalTime;
}

function solution(n, t, m, timetable) {
    let tableIdx = 0;
    let lastTime = -1;
    
    timetable = timetable.sort();
    const myTimetable = timetable.map(time => getTime(time));
    const tableSize = timetable.length;
    let busTime = getTime('09:00');
    let numOfBus = n;
    let noRooms = false;
    while (numOfBus > 0) {
        let vacant = m;
        while (vacant > 0 && tableIdx < tableSize && busTime >= myTimetable[tableIdx]) {
            lastTime = myTimetable[tableIdx];
            vacant -= 1;
            tableIdx += 1;
        }
        numOfBus -= 1;
        if (numOfBus == 0 && vacant == 0) {
            noRooms = true;
            break;
        }
        if (numOfBus > 0) {
            busTime = busTime + (t * 60);
        }
    }
    if (!noRooms || lastTime == -1) {
        lastTime = busTime;
    } else {
        lastTime -= 60;
    }
    return getClock(lastTime);
}
