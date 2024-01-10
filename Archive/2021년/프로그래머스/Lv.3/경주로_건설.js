class Node {
    constructor(value) {
        this.next = null;
        this.value = value;
    }
}

class Queue {
    constructor() {
        this.head = null;
        this.tail = null;
        this.len = 0;
    }
    
    push(value) {
        const node = new Node(value);
        if (this.head == null) {
            this.head = node;
            this.tail = node;
        } else {
            this.tail.next = node;
            this.tail = node;
        }
        this.len += 1;
    }
    
    pop() {
        if (this.len == 0) {
            return null;
        }
        const value = this.head.value;
        this.head = this.head.next;
        this.len -= 1;
        if (this.size == 0) {
            this.head = null;
            this.tail = null;
        }
        return value;
    }
    
    size() {
        return this.len;
    }
    
    empty() {
        return (this.len == 0);
    }
}

const INF = Number.MAX_SAFE_INTEGER;
const dir = [[0,-1], [1,0], [0,1], [-1,0]]; // 상우하좌, (x, y)

function bfs(board) {
    let answer = INF;
    const size = board.length;
    const destCost = Array.from({length: size},
        () => Array.from({length: size}, () => 0));
    const visited = Array.from({length: size},
        () => Array.from({length: size},
            () => Array.from({length: 4}, () => false)));
    visited[0][0][0] = true;
    visited[0][0][1] = true;
    visited[0][0][2] = true;
    visited[0][0][3] = true;
    const queue = new Queue();
    queue.push([0, 0, -1, 0]); // x, y, dir, cost
    while (queue.size()) {
        const [x, y, d, c] = queue.pop();
        if (x == size - 1 && y == size - 1) {
            answer = answer > c ? c : answer;
        }
        for (let i = 0; i < 4; i++) {
            const nx = x + dir[i][0];
            const ny = y + dir[i][1];
            if (nx < 0 || nx >= size ||
                ny < 0 || ny >= size ||
                board[nx][ny] == 1) {
                continue;
            }
            const cost = (d == -1 || d == i) ? c + 100 : c + 600;
            if (!visited[nx][ny][i] || destCost[nx][ny] >= cost ) {
                destCost[nx][ny] = cost;
                visited[nx][ny][i] = true;
                queue.push([nx, ny, i, cost]);
            }
        }
    }
    return answer;
}

function solution(board) {
    return bfs(board);
}
