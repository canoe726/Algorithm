function changeFlat (str) {
    return str.replace(/C#/g, '0')
              .replace(/D#/g, '1')
              .replace(/F#/g, '2')
              .replace(/G#/g, '3')
              .replace(/A#/g, '4');
}

function getTime (str) {
    const [hh, mm] = str.split(':');
    return (parseInt(hh) * 60) + parseInt(mm);
}

function solution(m, musicinfos) {
    let result = []; // 곡 제목, 재생시간 길이, 인덱스 정보
    
    m = changeFlat(m);
    musicinfos.forEach((musicinfo, idx) => {
        let [start, end, title, info] = musicinfo.split(',');
        info = changeFlat(info);
        const sTime = getTime(start);
        const eTime = getTime(end);
        
        let music = '';
        let iIdx = 0;
        for (let i = sTime; i <= eTime; i++) {
            music += info.charAt(iIdx);
            iIdx += 1;
            if (iIdx >= info.length) {
                iIdx = 0;
            }
        }
        
        if (music.includes(m)) {
            result.push({
                title: title,
                time: eTime - sTime,
                idx: idx,
            });
        }
    });
    
    if (result.length == 0) {
        return '(None)';
    } else {
        result = result.sort((a, b) => {
            if (a.time == b.time) {
                return a.idx - b.idx;
            } else {
                return b.time - a.time;
            }
        });
        return result[0].title;
    }
}
