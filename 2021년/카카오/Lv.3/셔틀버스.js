function getStringToTime (table) {
    let [hh, mm] = table.split(':');
    hh = Number(hh);
    mm = Number(mm);
    return (hh * 60) + mm;
}

function getTimeToString (time) {
    let hh = Math.floor(time / 60);
    let mm = time % 60;
    let HH = '', MM = '';
    if (hh < 10) {
        HH = `0${hh}`;
    } else {
        HH = String(hh);
    }
    if (mm < 10) {
        MM = `0${mm}`
    } else {
        MM = String(mm);
    }
    return `${HH}:${MM}`;
}

function solution(n, t, m, timetable) {
    timetable = timetable.map(table => getStringToTime(table)).sort((a, b) => a - b);

    let shuttle = getStringToTime('09:00');
    let cntOfShuttle = 1;
    let nextTime = 0;
    let people = [];
    while (cntOfShuttle <= n) {
        shuttle += nextTime;
        people = [];
        for (let i = 0; i < timetable.length; i++) {
            if (shuttle >= timetable[i] && people.length < m) {
                const crew = timetable.shift();
                people.push(crew);
                i -= 1;
            } else {
                break;
            }
        }
        cntOfShuttle += 1;
        nextTime = t;
    }
    
    if (people.length == 0 || people.length < m) {
        return getTimeToString(shuttle);
    } else if (people.length == m) {
        return getTimeToString(people[people.length - 1] - 1);
    } else {
        return -1;
    }
}
