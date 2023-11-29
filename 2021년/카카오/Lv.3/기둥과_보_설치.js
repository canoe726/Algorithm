function checkPillar (x, y, a, board, n) {
    if ((y == 0) ||
        (x > 0 && board[1][x - 1][y]) ||
        (board[1][x][y]) ||
        (y > 0 && board[0][x][y - 1])) {
        return true;
    } else {
        return false;
    }
}

function checkBeam (x, y, a, board, n) {
    if ((y > 0 && board[0][x][y - 1]) ||
        (y > 0 && x < n && board[0][x + 1][y - 1]) ||
        (x > 0 && x < n && board[1][x - 1][y] && board[1][x + 1][y])) {
        return true;
    } else {
        return false;
    }
}

function canInstall (x, y, a, board, n) {
    if (a == 0) { // 기둥
        return checkPillar(x, y, a, board, n);
    } else { // 보
        return checkBeam(x, y, a, board, n);
    }
}

function canRemove (frames, x, y, a, board, n) {
    for (let i = 0; i < frames.length; i++) {
        const [fx, fy, fa] = frames[i];
        if (fa == 0) {
            if (!checkPillar(fx, fy, fa, board, n)) {
                return false;
            }
        } else {
            if (!checkBeam(fx, fy, fa, board, n)) {
                return false;
            }
        }
    }
    return true;
}

function solution(n, build_frame) {
    const board = Array.from({ length: 2 },
            () => Array.from({ length: n + 1 },
            () => Array.from({ length: n + 1 }, () => false)));
    const frames = []; // 기둥 (0), 보 (1)
    
    build_frame.forEach((frame, idx) => {
        const [x, y, a, b] = frame;
        if (b == 0) {
            board[a][x][y] = false;
            let removeIdx = -1;
            for (let i = 0; i < frames.length; i++) {
                const [fx, fy, fa] = frames[i];
                if (fx == x && fy == y && fa == a) {
                    removeIdx = i;
                    break;
                }
            }
            frames.splice(removeIdx, 1);
            
            if (!canRemove(frames, x, y, a, board, n)) {
                board[a][x][y] = true;
                frames.push([x, y, a]);
            }
        } else {
            if (canInstall(x, y, a, board, n)) {
                board[a][x][y] = true;
                frames.push([x, y, a]);
            }
        }
    });
    frames.sort((a, b) => { // x, y, a
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
    return frames;
}
