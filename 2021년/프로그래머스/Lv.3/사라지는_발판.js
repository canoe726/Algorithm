const dy = [-1, 0, 1,  0]; // 상 우 하 좌
const dx = [ 0, 1, 0, -1];

function inRange (r, c, row, col) {
    if (r >= 0 && r < row && c >= 0 && c < col) {
        return true;
    } else {
        return false;
    }
}

function canMove (r, c, row, col, board) {
    for (let i = 0; i < 4; i++) {
        const [nr, nc] = [r + dy[i], c + dx[i]];
        if (inRange(nr, nc, row, col) && board[nr][nc] == 1) {
            return true;
        }
    }
    return false;
}

function getDist (board, aloc, bloc) {
    const row = board.length;
    const col = board[0].length;
    /** @return [이동한 거리, 첫 번째 플레이어의 승리여부] */
    function move (first, second) {
        const [fr, fc] = first;
        const [sr, sc] = second;
        
        if (!canMove(fr, fc, row, col, board)) {
            return [0, false]; // 0칸 이동, 두 번째 플레이어의 승리
        }
        if (fr == sr && fc == sc) {
            return [1, true]; // 1칸 이동, 첫 번째 플레이어의 승리
        }
        
        let minDist = 1e10;
        let maxDist = 0;
        let isFirstWin = false;
        
        for (let i = 0; i < 4; i++) {
            const [nfr, nfc] = [fr + dy[i], fc + dx[i]];
            if (!inRange(nfr, nfc, row, col) || board[nfr][nfc] == 0) {
                continue;
            }
            board[fr][fc] = 0;
            let [dist, isCurWin] = move(second, [nfr, nfc]);
            board[fr][fc] = 1;
            
            isCurWin = !isCurWin; // 재귀를 나오면서 첫 번째 플레이어가 바뀜
            if (isCurWin) {
                isFirstWin = true;
                if (minDist > dist) {
                    minDist = dist;
                }
            }
            if (!isFirstWin) {
                if (maxDist < dist) {
                    maxDist = dist;
                }
            }
        }
        const nextDist = isFirstWin ? minDist : maxDist;
        return [nextDist + 1, isFirstWin];
    }
    return move(aloc, bloc);
}

function solution (board, aloc, bloc) {
    const dist = getDist(board, aloc, bloc)[0];
    return dist;
}
