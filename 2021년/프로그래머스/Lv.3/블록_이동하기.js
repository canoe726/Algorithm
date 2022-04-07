const move = [[-1, 0], [1, 0], [0, -1], [0, 1]];   // (y, x) | 상, 하, 좌, 우

function canMovePos(board, front, size) {
    const [ a, b, time ] = front;
    const result = [];
    move.map(m => {
        const [mx, my] = m;
        const nextA = { ...a };
        nextA.x += mx;
        nextA.y += my;
        const nextB = { ...b };
        nextB.x += mx;
        nextB.y += my;
        if (board[nextA.y][nextA.x] == 0 && board[nextB.y][nextB.x] == 0) {
            result.push([{ y: nextA.y, x: nextA.x }, { y: nextB.y, x: nextB.x }, time + 1]);
        }
    });
    const rotate = [-1, 1];
    if (a.y == b.y) {   // 가로 회전
        rotate.map(rot => {
           if (board[a.y + rot][a.x] == 0 && board[b.y + rot][b.x] == 0) {
               // a축
               result.push([{ y: a.y, x: a.x }, { y: a.y + rot, x: a.x }, time + 1]);
               // b축
               result.push([{ y: b.y + rot, x: b.x }, { y: b.y, x: b.x }, time + 1]);
           }
        });
    } else {            // 세로 회전
        rotate.map(rot => {
           if (board[a.y][a.x + rot] == 0 && board[b.y][b.x + rot] == 0) {
               // a축
               result.push([{ y: a.y, x: a.x }, { y: a.y, x: a.x + rot }, time + 1]);
               // b축
               result.push([{ y: b.y, x: b.x + rot }, { y: b.y, x: b.x }, time + 1]);
           }
        });
    }    
    return result;
}

function solution(board) {
    let answer = 0;
    const size = board.length;
    let newBoard = Array.from({ length: size + 2 },
                              () => Array.from({ length: size + 2 },
                              () => 1)); // 모서리에 장애물 추가
    for (let i = 0; i < size; i++) {
        for (let j = 0; j < size; j++) {
            newBoard[i + 1][j + 1] = board[i][j];
        }
    }
    const visited = {};
    const queue = [];
    queue.push([{ y: 1, x: 1 }, { y: 1, x: 2 }, 0]);
    visited[`${JSON.stringify({ y: 1, x: 1 })}${JSON.stringify({ y: 1, x: 2 })}`] = true; // a, b 위치

    while (queue.length > 0) {
        const front = queue.shift();
        const [ a, b, time ] = front;
        const pos = canMovePos(newBoard, front, size);
        for (let i = 0; i < pos.length; i++) {
            const [ a, b, time ] = pos[i];
            if ((a.x == size && a.y == size) || (b.x == size && b.y == size)) {
                return time;
            }
            const posInfo = `${JSON.stringify({ y: a.y, x: a.x })}${JSON.stringify({ y: b.y, x: b.x })}`;
            if (!(posInfo in visited)) {
                queue.push(pos[i]);
                visited[posInfo] = true;
            }
        };
    }    
    return -1;
}
