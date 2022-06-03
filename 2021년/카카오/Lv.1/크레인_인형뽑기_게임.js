function solution(board, moves) {
    let answer = 0;
    const row = board.length;
    const dolls = [];
    
    moves.forEach(move => {
        const bCol = move - 1;
        let bRow = 0;
        while (bRow < row) {
            if (board[bRow][bCol] > 0) {
                const doll = board[bRow][bCol];
                dolls.push(doll);
                board[bRow][bCol] = 0;
                break;
            }
            bRow += 1;
        }
        
        if (dolls.length >= 2) {
            const first = dolls[dolls.length - 1];
            const second = dolls[dolls.length - 2];
            if (first == second) {
                answer += 2;
                dolls.pop();
                dolls.pop();
            }
        }
    });
    
    return answer;
}
