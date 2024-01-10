function get2dArray(n) {
    return Array.from({length: n}, () => Array.from({length: n}, () => 0));
}

function makeSnailArr(val, y, x, arr, n) {
    let cnt = 0;
    // down
    while (true) {
        y += 1;
        if (y < n && arr[y][x] == 0) {
            arr[y][x] = val;
            val += 1;
            cnt += 1;
        } else {
            y -= 1;
            break;
        }
    }
    // right
    while (cnt > 0) {
        x += 1;
        if (x < n && arr[y][x] == 0) {
            arr[y][x] = val;
            val += 1;
            cnt += 1;
        } else {
            x -= 1;
            break;
        }
    }
    // left-up
    while (cnt > 0) {
        x -= 1;
        y -= 1;
        if (y > 0 && x > 0 && arr[y][x] == 0) {
            arr[y][x] = val;
            val += 1;
            cnt += 1;
        } else {
            x += 1;
            y += 1;
            break;
        }
    }
    if (cnt > 0) {
        makeSnailArr(val, y, x, arr, n);
    }
}

function getAnswer(arr, n) {
    const answer = [];
    for (let i = 0; i < n; i++) {
        for (let j = 0; j < n; j++) {
            if (arr[i][j] > 0) {
                answer.push(arr[i][j]);
            }
        }
    }
    return answer;
}

function solution(n) {
    const arr = get2dArray(n);
    arr[0][0] = 1;
    makeSnailArr(2, 0, 0, arr, n);
    return getAnswer(arr, n);
}
