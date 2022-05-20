const dy = [-1, 0, 1, 0]; // 상 우 하 좌
const dx = [0, 1, 0, -1]; // R: +1, L: -1

function fixLocation (y, x, row, col) {
    if (y >= row) {
        return [0, x];
    }
    if (y < 0) {
        return [row - 1, x];
    }
    if (x >= col) {
        return [y, 0];
    }
    if (x < 0) {
        return [y, col - 1];
    }
    return [y, x];
}

function getNextDir (curDir, cell) {
    if (cell == 'S') {
        return curDir;
    } else if (cell == 'L') {
        let dir = curDir - 1;
        if (dir < 0) {
            dir = 3;
        }
        return dir;
    } else if (cell == 'R') {
        let dir = curDir + 1;
        if (dir > 3) {
            dir = 0;
        }
        return dir;
    } else {
        return 'invalid input';
    }
}

function moveLight (dp, pos, grid, row, col) {
    let depth = 0;
    let [d, r, c] = pos;
    while (dp[d][r][c] == 0) {
        depth += 1;
        dp[d][r][c] = depth;
        
        const [nr, nc] = fixLocation(r + dy[d], c + dx[d], row, col); // 이동
        const nd = getNextDir(d, grid[nr].charAt(nc)); // 방향전환
        [d, r, c] = [nd, nr, nc];
    }
    return depth;
}

function solution (grid) {
    let answer = [];
    const row = grid.length;
    const col = grid[0].length;
    const dp = Array.from({ length: 4 },
         () => Array.from({ length: 501 },
         () => Array.from({ length: 501 },
         () => 0)));
    
    for (let r = 0; r < row; r++) {
        for (let c = 0; c < col; c++) {
            const cell = grid[r][c];
            for (let d = 0; d < 4; d++) {
                const depth = moveLight(dp, [d, r, c], grid, row, col);
                if (depth > 0) {
                    answer.push(depth);
                }
            }
        }
    }
    return answer.sort((a, b) => a - b);
}
