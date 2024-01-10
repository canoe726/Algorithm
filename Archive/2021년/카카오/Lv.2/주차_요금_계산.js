function getTime (str) {
    const [hh, mm] = str.split(':');
    return (parseInt(hh) * 60) + parseInt(mm);
}

function solution(fees, records) {
    const cars = {};
    records.forEach(record => {
        const [t, id, status] = record.split(' ');
        const time = getTime(t);
        if (id in cars) {
            if (status == 'IN') {
                cars[id].inTime = time;
            } else {
                const inTime = cars[id].inTime;
                if (inTime >= 0) {
                    const accTime = time - inTime;
                    cars[id].inTime = -1;
                    cars[id].accTime += accTime;
                }
            }     
        } else {
            cars[id] = {
                inTime: time,
                accTime: 0,
                cost: 0,
            }
        }
    });
    
    for (const key in cars) {
        const inTime = cars[key].inTime;
        if (inTime >= 0) {
            const time = getTime('23:59');
            const accTime = time - inTime;
            cars[key].accTime += accTime;
        }
    }
    
    for (const key in cars) {
        const accTime = cars[key].accTime;
        const [bTime, bCost, pTime, pCost] = fees;
        if (accTime <= bTime) {
            cars[key].cost += bCost;
        } else {
            cars[key].cost += bCost;
            cars[key].cost += Math.ceil((accTime - bTime) / pTime) * pCost;
        }
    }
    
    const result = Object.entries(cars).map(([key, value]) => {
        return {
            id: key,
            cost: value.cost,
        }
    });
    return result.sort((a, b) => a.id - b.id).map(item => item.cost);
}
