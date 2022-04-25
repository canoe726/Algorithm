function getAccBoard(n, m, skill) {
    const board = Array.from({ length: n + 1}, () => Array.from({ length: m + 1}, () => 0));
    for (let i = 0; i < skill.length; i++) {
        const [type, r1, c1, r2, c2, degree] = skill[i];
        const amount = type === 1 ? -degree : degree; // 누적합 활용
        board[r1][c1] += amount;
        board[r1][c2 + 1] -= amount;
        board[r2 + 1][c1] -= amount;
        board[r2 + 1][c2 + 1] += amount;
    }
    for (let y = 0; y < n + 1; y++) { // 행 기준
        for (let x = 1; x < m + 1; x++) {
            board[y][x] += board[y][x - 1];
        }
    }
    for (let x = 0; x < m + 1; x++) { // 열 기준
        for (let y = 1; y < n + 1; y++) {
            board[y][x] += board[y - 1][x];
        }
    }
    return board;
}

function solution(board, skill) {
    const n = board.length;
    const m = board[0].length;
    let answer = 0;
    
    const accBoard = getAccBoard(n, m, skill);
    for (let i = 0; i < n; i++) {
        for (let j = 0; j < m; j++) {
            board[i][j] += accBoard[i][j];
        }
    }
    for (let i = 0; i < n; i++) {
        for (let j = 0; j < m; j++) {
            if (board[i][j] >= 1) {
                answer += 1;
            }
        }
    }
    return answer;
}
