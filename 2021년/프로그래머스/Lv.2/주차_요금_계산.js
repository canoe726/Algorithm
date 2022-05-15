function getTime (time) {
    const splited = time.split(':');
    const [hh, mm] = splited;
    return (parseInt(hh) * 60) + parseInt(mm);
}

function getCost (accTime, fees) {
    const [baseTime, baseCost, perTime, perCost] = fees;
    let cost = 0;
    if (accTime > baseTime) {
        cost = baseCost + (Math.ceil((accTime - baseTime) / perTime) * perCost);
    } else {
        cost = baseCost;
    }
    return cost;
}

function parseRecords (records, fees) {
    const parsed = {};
    records.map(record => {
        const splited = record.split(' ');
        const [time, carNumber, status] = splited;
        
        if (!(carNumber in parsed)) {
            parsed[carNumber] = {
                inTime: -1,
                time: 0, // 누적시간
                cost: 0, // 누적 비용
            }
        }
        if (status == 'IN') {
            parsed[carNumber]['inTime'] = getTime(time);
        } else {
            const inTime = parsed[carNumber]['inTime'];
            const outTime = getTime(time);
            parsed[carNumber]['time'] += outTime - inTime;
            parsed[carNumber]['inTime'] = -1;
        }
    });
    // 출차 시각이 없는 차량인 경우 출차 시간 23:59
    Object.entries(parsed).map(item => {
        const [key, value] = item;
        if (value['inTime'] != -1) {
            const inTime = value['inTime'];
            const outTime = getTime('23:59');
            value['time'] += outTime - inTime;
            value['inTime'] = -1;
            return item;
        } else {
            return item;
        }
    });
    Object.entries(parsed).map(item => {
        const [key, value] = item;
        const accTime = value['time'];
        value['cost'] += getCost(accTime, fees);
        return item;
    });
    return parsed;
}

function solution(fees, records) {
    const parsed = parseRecords(records, fees);
    const keys = Object.keys(parsed).sort();
    const sorted = [];
    keys.forEach(key => {
        sorted.push(parsed[key]);
    });
    
    return sorted.map(item => item['cost']);
}
