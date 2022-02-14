const INF = 987654321;

function getInitArr(rows, columns) {
    let num = 1;
    const arr = Array.from({length: rows}, () => Array.from({length: columns}), () => 0);
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < columns; c++) {
            arr[r][c] = num;
            num += 1;
        }
    }
    return arr;
}

function getPoints(query) {
    // (y, x)
    // 좌상, 우상, 우하, 좌하
    const y = [query[0], query[2]];
    const x = [query[1], query[3]];
    return [
        { y: Math.min.apply(null, y) - 1, x: Math.min.apply(null, x) - 1 },
        { y: Math.min.apply(null, y) - 1, x: Math.max.apply(null, x) - 1 },
        { y: Math.max.apply(null, y) - 1, x: Math.max.apply(null, x) - 1 },
        { y: Math.max.apply(null, y) - 1, x: Math.min.apply(null, x) - 1 }
    ]
}

function horizontalRight(arr, resArr, start, end) {
    let minVal = INF;
    for (let i = start.x + 1; i <= end.x; i++) {
        if (minVal > arr[start.y][i]) {
            minVal = arr[start.y][i];
        }
        resArr[start.y][i] = arr[start.y][i - 1];
    }
    return minVal;
}

function horizontalLeft(arr, resArr, start, end) {
    let minVal = INF;
    for (let i = start.x - 1; i >= end.x; i--) {
        if (minVal > arr[start.y][i]) {
            minVal = arr[start.y][i];
        }
        resArr[start.y][i] = arr[start.y][i + 1];
    }
    return minVal;
}

function verticalDown(arr, resArr, start, end) {
    let minVal = INF;
    for (let i = start.y + 1; i <= end.y; i++) {
        if (minVal > arr[i][start.x]) {
            minVal = arr[i][start.x];
        }
        resArr[i][start.x] = arr[i - 1][start.x];
    }    
    return minVal;
}

function verticalUp(arr, resArr, start, end) {
    let minVal = INF;
    for (let i = start.y - 1; i >= end.y; i--) {
        if (minVal > arr[i][start.x]) {
            minVal = arr[i][start.x];
        }
        resArr[i][start.x] = arr[i + 1][start.x];
    }    
    return minVal;
}

function solution(rows, columns, queries) {
    let arr = getInitArr(rows, columns);
    let resArr = arr.map(item => item.slice()).slice();
    const answer = [];
    queries.forEach((query) => {
        const points = getPoints(query);
        const p1Min = horizontalRight(arr, resArr, points[0], points[1]);
        const p2Min = verticalDown(arr, resArr, points[1], points[2]);
        const p3Min = horizontalLeft(arr, resArr, points[2], points[3]);
        const p4Min = verticalUp(arr, resArr, points[3], points[0]);
        answer.push(Math.min.apply(null, [p1Min, p2Min, p3Min, p4Min]));
        
        arr = resArr.map(item => item.slice()).slice();
        resArr = arr.map(item => item.slice()).slice();
    });
    return answer;
}
