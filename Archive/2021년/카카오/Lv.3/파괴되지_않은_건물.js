function solution(board, skills) {
    let answer = 0;
    const row = board.length;
    const col = board[0].length;
    const acc = Array.from({ length: row + 1 },
          () => Array.from({ length: col + 1 }, () => 0));
    
    skills.forEach(skill => {
        let [type, r1, c1, r2, c2, degree] = skill;
        if (type == 1) {
            degree *= -1;
        }
        acc[r1][c1] += degree;
        acc[r1][c2 + 1] -= degree;
        
        acc[r2 + 1][c1] -= degree;
        acc[r2 + 1][c2 + 1] += degree;
    });
    for (let c = 0; c < acc[0].length; c++) {
        for (let r = 1; r < acc.length; r++) {
            acc[r][c] += acc[r - 1][c];
        }
    }
    for (let r = 0; r < acc.length; r++) {
        for (let c = 1; c < acc[0].length; c++) {
            acc[r][c] += acc[r][c - 1];
        }
    }
    for (let r = 0; r < row; r++) {
        for (let c = 0; c < col; c++) {
            board[r][c] += acc[r][c];
            if (board[r][c] > 0) {
                answer += 1;
            }
        }
    }    
    return answer;
}
