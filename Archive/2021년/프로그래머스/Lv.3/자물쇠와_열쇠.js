function show2dArray(arr, n) {
    for (let i = 0; i < n; i++) {
        let res = ''
        for (let j = 0; j < n; j++) {
            res += arr[i][j] + ''
        }
        console.log(res)
    }
}

function copy2dArray(arr) {
    const copyArr = [];
    for (let i = 0; i < arr.length; i++) {
        copyArr.push(arr[i].slice());
    }
    return copyArr;
}

function getNbyN2dArray(n, val) {
    const arr = [];
    for (let i = 0; i < n; i++) {
        arr.push(Array.from({ length: n }, () => val))
    }
    return arr;
}

function inputArrayValue(arr1, arr2, s1, e1, s2, e2) {
    let si = 0, sj = 0;
    for (let i = s1; i < e1; i++) {
        sj = 0;
        for (let j = s2; j < e2; j++) {
            arr1[i][j] = arr2[si][sj];
            sj += 1;
        }
        si += 1;
    }
}

function inputArrayValueIfOne(arr1, arr2, s1, e1, s2, e2) {
    let si = 0, sj = 0
    for (let i = s1; i < e1; i++) {
        sj = 0;
        for (let j = s2; j < e2; j++) {
            if (arr1[i][j] == 1 && arr2[si][sj] == 1) {
                return; 
            }
            if (arr2[si][sj] == 1) {
                arr1[i][j] = arr2[si][sj];
            }
            sj += 1;
        }
        si += 1;
    }
}

function getLockBoard(lock, m, n) {
    const size = n + 2 * (m - 1);
    // 원소 값 : 0, 1, 9
    const sizeArr = getNbyN2dArray(size, 9);
    inputArrayValue(sizeArr, lock, m - 1, m - 1 + n, m - 1, m - 1 + n);
    return sizeArr;
}

function checkIsSolved(board, m, n) {
    const boardSize = board.length
    
    for (let bi = m - 1; bi < m - 1 + n; bi++) {
        for (let bj = m - 1; bj < m - 1 + n; bj++) {
            if (board[bi][bj] != 1) {
                return false;
            }
        }
    }
    return true;
}

function checkLockBoardWithKey(lockBoard, key, m, n) {
    const size = m - 1 + n
    
    for (let i = 0; i < size; i++) {
        for (let j = 0; j < size; j++) {
            const board = copy2dArray(lockBoard);
            // Key, Lock 끼워보는 곳 (정확하게 일치해야함)
            inputArrayValueIfOne(board, key, i, i + key.length, j, j + key.length);
            if (checkIsSolved(board, m, n)) {
                return true;
            }
        }
    }
    return false;
}

function get90DegreeClockwiseRot2dArray(arr) {
    const rotArr = copy2dArray(arr);
    const size = arr.length;
    
    for (let i = 0; i < size; i++) {
        for (let j = 0; j < size; j++) {
            rotArr[i][j] = arr[size - 1 - j][i];
        }
    }
    return rotArr;
}

function getRotateKey(key, dir) {
    let myKey = copy2dArray(key);
    for (let loop = 0; loop < dir; loop++) {
        myKey = get90DegreeClockwiseRot2dArray(myKey)
    }
    return myKey;
}

function solution(key, lock) {
    const m = key.length;
    const n = lock.length;
    const size = n + 2 * (m - 1);
    let canOpen = false;
    
    for (let dir = 0; dir < 4; dir++) {
        const lockBoard = getLockBoard(lock, m, n);
        const myKey = getRotateKey(key, dir);
        if (checkLockBoardWithKey(lockBoard, myKey, m, n)) {
            canOpen = true;
            break;
        }
    }
    return canOpen;
}
