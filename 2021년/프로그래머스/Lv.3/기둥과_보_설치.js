// 좌표는 항상 시작점 기준
const colCond1 = (x, y) => ([x1, y1, a1]) => (x1 == x && y1 == y-1 && a1 == 0); // 기둥
const colCond2 = (x, y) => ([x1, y1, a1]) => (x1 == x-1 && y1 == y && a1 == 1); // 보
const colCond3 = (x, y) => ([x1, y1, a1]) => (x1 == x && y1 == y && a1 == 1); // 보

const rowCond1 = (x, y) => ([x1, y1, a1]) => (x1 == x && y1 == y-1 && a1 == 0); // 기둥
const rowCond2 = (x, y) => ([x1, y1, a1]) => (x1 == x+1 && y1 == y-1 && a1 == 0); // 기둥
const rowCond3 = (x, y) => ([x1, y1, a1]) => (x1 == x-1 && y1 == y && a1 == 1); // 보
const rowCond4 = (x, y) => ([x1, y1, a1]) => (x1 == x+1 && y1 == y && a1 == 1); // 보

function checkRow(board, x, y, a) {
    let isValid = false;
    if (board.find(rowCond1(x, y))) {
        isValid = true;
    }
    if (board.find(rowCond2(x, y))) {
        isValid = true;
    }
    if (board.find(rowCond3(x, y)) && board.find(rowCond4(x, y))) {
        isValid = true;
    }
    return isValid;
}

function checkCol(board, x, y, a) {
    let isValid = false;
    if (y == 0) {
        isValid = true;
    }
    if (board.find(colCond1(x, y))) {
        isValid = true;
    }
    if (board.find(colCond2(x, y))) {
        isValid = true;
    }
    if (board.find(colCond3(x, y))) {
        isValid = true;
    }
    return isValid;
}

function constructRow(board, x, y, a) {
    if (checkRow(board, x, y, a)) {
        board.push([x, y, a]);
    }
}

function constructCol(board, x, y, a) {
    if (checkCol(board, x, y, a)) {     
        board.push([x, y, a]);
    }
}

function destroyItem(board, x, y, a) {
    let canRemove = true;
    let temp = board.slice();
    const idx = temp.findIndex(([x1, y1, a1]) => (x1 == x && y1 == y && a1 == a))
    temp = [...temp.slice(0, idx), ...temp.slice(idx + 1)];
    temp.forEach(([x1, y1, a1]) => {
        if (a1 == 0 && !checkCol(temp, x1, y1, a1)) {
            canRemove = false;
        }
        if (a1 == 1 && !checkRow(temp, x1, y1, a1)) {
            canRemove = false;
        }
    });
    if (canRemove) {
        board.splice(idx, 1);
    }
}

function solution(n, build_frame) {
    let board = [];
    build_frame.forEach(frame => {
        const [x, y, a, b] = frame;
        if (a == 0 && b == 0) {
            destroyItem(board, x, y, a);
        } else if (a == 0 && b == 1) {
            constructCol(board, x, y, a);
        } else if (a == 1 && b == 0) {
            destroyItem(board, x, y, a);
        } else if (a == 1 && b == 1) {
            constructRow(board, x, y, a);
        }
    });
    return board.sort((a, b) => {
        if (a[0] == b[0]) {
            if (a[1] == b[1]) {
                return a[2] - b[2];
            } else {
                return a[1] - b[1];
            }
        } else {
            return a[0] - b[0];
        }
    });
}
