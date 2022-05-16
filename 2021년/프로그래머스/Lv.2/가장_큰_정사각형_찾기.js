function solution(board) {
    let answer = 0;
    const row = board.length;
    const col = board[0].length;
    for (let r = 1; r < row; r++) {
        for (let c = 1; c < col; c++) {
            const a = board[r][c];
            const x = board[r - 1][c - 1];
            const y = board[r - 1][c];
            const z = board[r][c - 1];
            if (a >= 1 && x >= 1 && y >= 1 && z >= 1) {
                let minValue = Math.min(x, y);
                minValue = Math.min(minValue, z);
                board[r][c] = minValue + 1;
            }
        }
    }
    for (let r = 0; r < row; r++) {
        for (let c = 0; c < col; c++) {
            if (board[r][c] > answer) {
                answer = board[r][c];
            }
        }
    }
    return answer * answer;
}
