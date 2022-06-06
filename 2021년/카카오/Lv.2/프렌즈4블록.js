function checkFilter (y, x, filterSize, board) {
    const pos = [];
    let cnt = 0;
    const ch = board[y][x];
    
    for (let i = 0; i < filterSize; i++) {
        for (let j = 0; j < filterSize; j++) {
            if (ch == board[y + i][x + j]) {
                cnt += 1;
                pos.push([y + i, x + j]);
            }
        }
    }
    if (cnt == filterSize * filterSize) {
        return pos;
    } else {
        return null;
    }
}

function remove (m, n, board) {
    let cnt = 0;
    let canRemove = [];
    const filterSize = 2;
    for (let y = 0; y < m - filterSize + 1; y++) {
        for (let x = 0; x < n - filterSize + 1; x++) {
            const pos = checkFilter(y, x, filterSize, board);
            if (pos) {
                canRemove = [...canRemove, ...pos];
            }
        }
    }
    
    for (let i = 0; i < canRemove.length; i++) {
        const [y, x] = canRemove[i];
        if (board[y][x] != ' ') {
            board[y][x] = ' ';
            cnt += 1;
        }
    }
    return cnt;
}

function fixLoc (m, n, board) {
    for (let x = 0; x < n; x++) {
        while (true) {
            let y = m - 1;
            let empty = 0;
            let moved = false;
            while (y >= 0) {
                if (board[y][x] == ' ') {
                    empty += 1;
                }
                if (empty > 0 && board[y][x] != ' ') {
                    moved = true;
                    board[y + empty][x] = board[y][x];
                    board[y][x] = ' ';
                    break;
                }
                y -= 1;
            }
            if (!moved) {
                break;
            }
        }
    }
}

function solution(m, n, board) {
    let answer = 0;
    board = board.map(item => item.split(''));
    while (true) {
        const removed = remove(m, n, board);
        if (removed == 0) {
            break;
        }
        answer += removed;
        fixLoc(m, n, board);
    }
    return answer;
}
