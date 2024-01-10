// 플로이드 와샬 알고리즘
const INF = 987654321;

function initBoard(board, n, fares) {
    let newBoard = board.slice().map(item => item.slice());
    let i, j;
    for (i = 0; i < n; i++) {
        newBoard[i][i] = 0;
    }
    for (i = 0; i < fares.length; i++) {
        newBoard[fares[i][0] - 1][fares[i][1] - 1] = fares[i][2];
        newBoard[fares[i][1] - 1][fares[i][0] - 1] = fares[i][2];
    }
    return newBoard;
}

function solution(n, s, a, b, fares) {
    let board = Array.from({ length: n }, () => []).map(() => Array.from({ length: n }, () => INF));
    board = initBoard(board, n, fares);
    
    // k : 거쳐가는 노드, i : 시작 노드, j : 도착 노드
    let k, i, j;
    for (k = 0; k < n; k++) {
        for (i = 0; i < n; i++) {
            for (j = 0; j < n; j++) {
                if (board[i][j] > board[i][k] + board[k][j]) {
                    board[i][j] = board[i][k] + board[k][j];
                }
            }
        }
    }
    
    let answer = INF;
    
    // 합승을 안하고 따로 가는 경우
    let short = board[s - 1][a - 1] + board[s - 1][b - 1];
    answer = Math.min(answer, short);
    // 합승을 하는 경우 모든 노드를 합승 지점으로 간주
    for (let idx = 0; idx < n; idx++) {
        let nextShort = board[s - 1][idx] + board[idx][a - 1] + board[idx][b - 1];
        answer = Math.min(answer, nextShort);
    }
    return answer;
}
