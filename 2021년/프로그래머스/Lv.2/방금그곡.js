const code = {
    'C#': 0,
    'D#': 1,
    'F#': 2,
    'G#': 3,
    'A#': 4
};

function replaceHashCode(m) {
    let result = m;
    const tCode = Object.entries(code);
    tCode.forEach(c => {
        const regex = new RegExp(c[0], 'g');
        result = result.replace(regex, c[1]);
    });
    return result;
}

function getTimeGap(s, e) {
    const start = s.split(':');
    const sHours = parseInt(start[0]);
    const sMinutes = parseInt(start[1]);
    
    const end = e.split(':');
    const eHours = parseInt(end[0]);
    const eMinutes = parseInt(end[1]);
    
    let hours = eHours - sHours;
    let minutes = eMinutes - sMinutes;
    if (minutes < 0) {
        hours -= 1;
        minutes += 60;
    }
    return (hours * 60) + minutes;
}

function getWholeCode(code, time) {
    let nCode = '';
    const rep = parseInt(time / code.length);
    const remain = time % code.length;

    for (let idx = 0; idx < rep; idx++) {
        nCode += code;
    }
    const leftCode = code.substr(0, remain);
    return nCode + leftCode
}

function getMusics(m, musicInfos) {
    let myMusic = [];
    let maxPlaytime = -1;
    
    musicInfos.forEach(musicInfo => {
        const info = musicInfo.split(',');
        const timeGap = getTimeGap(info[0], info[1]);
        const name = info[2];
        let nCode = replaceHashCode(info[3]);
        nCode = getWholeCode(nCode, timeGap);
        
        if (nCode.includes(m)) {
            myMusic.push({
                name: name,
                playtime: timeGap
            });
            maxPlaytime = Math.max(maxPlaytime, timeGap);
        }        
    });
    
    if (myMusic.length == 0) {
        return '(None)';
    } else if (myMusic.length == 1) {
        return myMusic[0].name;
    } else {
        const tMusic = myMusic.filter(item => item.playtime == maxPlaytime);
        return tMusic[0].name;
    }
}


function solution(m, musicinfos) {
    const rM = replaceHashCode(m);
    return getMusics(rM, musicinfos);    
}
