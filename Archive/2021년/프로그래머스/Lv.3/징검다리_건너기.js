function makeSteps(stones, n) {
    const bridge = stones.slice();
    const size = stones.length;
    for (let i = 0; i < size; i++) {
        if (bridge[i] - n < 0) {
            bridge[i] = 0;
        } else {
            bridge[i] = bridge[i] - n;
        }
    }
    return bridge;
}

function canGoNextSteps(stones, k) {
    const size = stones.length;
    let curPos = -1;
    let crossStone = false;
    while (curPos < size) {
        let makeStep = false;
        for (let step = 1; step <= k; step++) {
            if (curPos + step >= size) {
                crossStone = true;
                makeStep = true;
                break;
            }
            if (stones[curPos + step] > 0) {
                curPos += step;
                makeStep = true;
                break;
            }
        }
        if (!makeStep) {
            break;
        }
        if (crossStone) {
            break;
        }
    }
    return (curPos == size - 1) || crossStone;
}

// lower bound
function binarySearch(stones, k, s, e) {
    let start = s;
    let end = e;
    while (start < end) {
        const mid = parseInt((start + end) / 2);
        const bridge = makeSteps(stones, mid);
        if (canGoNextSteps(bridge, k)) {
            start = mid + 1;
        } else {
            end = mid;
        }        
    }
    return end;
}

function solution(stones, k) {
    let maxValue = 200000000;
    return binarySearch(stones, k, 0, maxValue);
}
