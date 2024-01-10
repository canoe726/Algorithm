const straight = 100;
const corner = 500;
const dy = [-1, 1,  0, 0]; // 상 하 좌 우
const dx = [ 0, 0, -1, 1];

function isCorner (curDir, nextDir) {
    if (curDir == -1) {
        return false;
    }
    if (curDir == 0 && (nextDir == 2 || nextDir == 3)) { // 상 -> 좌, 우 : 코너
        return true;
    } else if (curDir == 1 && (nextDir == 2 || nextDir == 3)) { // 하 -> 좌, 우 : 코너
        return true;
    } else if (curDir == 2 && (nextDir == 0 || nextDir == 1)) { // 좌 -> 상, 하 : 코너
        return true;
    } else if (curDir == 3 && (nextDir == 0 || nextDir == 1)) { // 우 -> 상, 하 : 코너
        return true;
    }
    return false;
}

function inRange (y, x, size) {
    if (y >= 0 && y < size && x >= 0 && x < size) {
        return true;
    } else {
        return false;
    }
}

function findMinCost (sPos, board, size) {
    const INF = 9876543210;
    let minCost = INF;
    const visited = Array.from({ length: 4 }, () =>
                    Array.from({ length: size }, () =>
                    Array.from({ length: size }, () => false)));
    const dp = Array.from({ length: 4 }, () =>
               Array.from({ length: size }, () =>
               Array.from({ length: size }, () => INF)));
    
    for (let d = 0; d < 4; d++) {
        visited[d][0][0] = true;
    }
    function dfs (posInfo) {
        const [y, x, curDir, cost] = posInfo;
        if (y == size - 1 && x == size - 1) {
            minCost = Math.min(minCost, cost);
            return;
        }
        for (let nextDir = 0; nextDir < 4; nextDir++) {
            const [ny, nx] = [y + dy[nextDir], x + dx[nextDir]];
            if (!inRange(ny, nx, size)) {
                continue;
            }
            if (!visited[nextDir][ny][nx] && board[ny][nx] != 1) {
                const install = isCorner(curDir, nextDir) ? corner + straight : straight;
                const nextCost = cost + install;
                if (dp[nextDir][ny][nx] >= nextCost) {
                    dp[nextDir][ny][nx] = Math.min(dp[nextDir][ny][nx], nextCost);
                    
                    visited[nextDir][ny][nx] = true;
                    dfs([ny, nx, nextDir, nextCost]);
                    visited[nextDir][ny][nx] = false;
                }
            }
        }
    }
    dfs([...sPos, -1, 0]);
    return minCost;
}

function solution(board) {
    let answer = 0;
    const size = board.length;
    const minCost = findMinCost([0, 0], board, size);
    return minCost;
}
