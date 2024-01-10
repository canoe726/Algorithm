// manPos  : (y, x)
// partPos : (y, x)
const exception = [
    {
        manPos:  { x: 0, y: -2 },
        partPos: [{ x: 0, y: -1 }]
    },
    {
        manPos:  { x: 2, y: 0 },
        partPos: [{ x: 1, y: 0 }]
    },
    {
        manPos:  { x: 0, y: 2 },
        partPos: [{ x: 0, y: 1 }]
    },
    {
        manPos:  { x: -2, y: 0 },
        partPos: [{ x: -1, y: 0 }]
    },
    {
        manPos:  { x: 1, y: -1 },
        partPos: [{ x: 0, y: -1 }, { x: 1, y: 0 }]
    },
    {
        manPos:  { x: 1, y: 1 },
        partPos: [{ x: 0, y: 1 }, { x: 1, y: 0 }]
    },
    {
        manPos:  { x: -1, y: 1 },
        partPos: [{ x: 0, y: 1 }, { x: -1, y: 0 }]
    },
    {
        manPos:  { x: -1, y: 1 },
        partPos: [{ x: -1, y: 0 }, { x: 0, y: 1 }]
    },
];

function getManhattanDistance(r1, c1, r2, c2) {
    return (Math.abs(r1 - r2) + Math.abs(c1 - c2));
}

function getPPos(place) {
    let pPos = [];
    for (let yPos = 0; yPos < place.length; yPos++) {
        for (let xPos = 0; xPos < place[yPos].length; xPos++) {
            if (place[yPos][xPos] == 'P') {
                pPos.push({ x: xPos, y: yPos });
            }                
        }
    }
    return pPos;
}

function getCombination(pos, selected, depth, start, n, prev) {
    let ret = [];
    if (depth == n) {
        ret.push(prev);
        return ret;
    }
    for (let idx = start; idx < selected.length; idx++) {
        if (selected[idx]) continue;
        
        selected[idx] = true;
        ret = ret.concat(getCombination(
            pos,
            selected,
            depth + 1,
            idx + 1,
            n,
            [...prev, pos[idx]]));
        selected[idx] = false;
    };
    
    return ret;
}

// p1 위치를 기준으로 p2 위치가 유효한 exception 위치인지 아닌지 체크
function checkExceptionWhenTwo(p1, p2, place) {
    const maxArrSize = 5;
    for (let eIdx = 0; eIdx < exception.length; eIdx++) {
        const eX = p1.x + exception[eIdx].manPos.x;
        const eY = p1.y + exception[eIdx].manPos.y;
        
        // 배열 범위 내 인지 검사
        if ((eX >= 0 && eX < maxArrSize) &&
            (eY >= 0 && eY < maxArrSize)) {
            
            // 예외 위치를 찾으면 파티션이 제 위치에 있는지 확인 
            if (eX == p2.x && eY == p2.y) {
                
                const partitionPos = exception[eIdx].partPos;
                for (let pIdx = 0; pIdx < partitionPos.length; pIdx++) {
                    const partX = p1.x + partitionPos[pIdx].x;
                    const partY = p1.y + partitionPos[pIdx].y;
                    
                    // 파티션 위치가 유효한지 검사
                    if ((partX >= 0 && partX < maxArrSize) &&
                        (partY >= 0 && partY < maxArrSize)) {
                    
                        if (place[partY][partX] != 'X') {
                            return false;
                        }
                    }
                }
            }
        }
    }
    return true;
}

// valid: true, inValid: false
function checkValidation(place, combItem) {
    const p1 = combItem[0];
    const p2 = combItem[1];
    
    const dist = getManhattanDistance(p1.x, p1.y, p2.x, p2.y);
    if (dist <= 1) {
        return false;
    } else if (dist >= 3) {
        return true;
    } else {
        return checkExceptionWhenTwo(p1, p2, place);
    }
}

function solution(places) {
    let answer = [];
    for (let idx = 0; idx < places.length; idx++) {
        let isValid = 1;
        let place = places[idx].slice();
        const pPos = getPPos(place);
        const comb = getCombination(
            pPos,
            Array.from({ length: pPos.length }, () => false),
            0,
            0,
            2,
            []);
        for (let cIdx = 0; cIdx < comb.length; cIdx++) {
            if (!checkValidation(place, comb[cIdx])) {
                isValid = 0;
                break;
            }
        }
        answer.push(isValid);
    }
    return answer;
}
