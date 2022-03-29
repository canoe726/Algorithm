function fillBoard(initBoard, rectangle) {
    const board = initBoard.slice();
    rectangle.forEach(rect => {
        const [x1, y1, x2, y2] = rect;
        // 좌하 -> 좌상
        for (let one = y1; one <= y2; one++) {
            if (board[x1][one] == 2) {
                continue;
            }
            board[x1][one] = 1;
        }
        // 좌상 -> 우상
        for (let two = x1; two <= x2; two++) {
            if (board[two][y2] == 2) {
                continue;
            }
            board[two][y2] = 1;
        }
        // 우상 -> 우하
        for (let three = y2; three >= y1; three--) {
            if (board[x2][three] == 2) {
                continue;
            }
            board[x2][three] = 1;
        }
        // 우하 -> 좌하
        for (let four = x2; four >= x1; four--) {
            if (board[four][y1] == 2) {
                continue;
            }
            board[four][y1] = 1;
        }
        for (let x = x1 + 1; x <= x2 - 1; x++) {
            for (let y = y1 + 1; y <= y2 - 1; y++) {
                board[x][y] = 2;
            }
        }
    });
    return board;
}

function getLeftDown(rectangle) {
    const pos = rectangle.map(item => {
        const [x1, y1, x2, y2] = item;
        return [[x1, y1], [x2, y2]];
    }).flat();
    return pos.sort((a, b) => {
        const [ax, ay] = a;
        const [bx, by] = b;
        if (ax > bx) {
            return 1;
        } else if (ax < bx) {
            return -1;
        } else {
            if (ay > by) {
                return 1;
            } else if (ay < by) {
                return -1;
            } else {
                return 0;
            }
        }
    })[0];
}

function solution(rectangle, characterX, characterY, itemX, itemY) {
    // [[1,1,7,4],[3,2,5,5],[4,3,6,9],[2,6,8,8]] 의 경우에 (3,5) -> (3,6)은 이어져 있지 않은데 연결되는 경우가 생겨
    // 모든 크기를 2배 해주어야 한다.
    const size = 100;
    const rectangle2x = rectangle.map(([a, b, c, d]) => [a*2, b*2, c*2, d*2]);
    const [characterX2x, characterY2x] = [characterX * 2, characterY * 2];
    const [itemX2x, itemY2x] = [itemX * 2, itemY * 2];
    const initBoard = Array.from(Array(size + 1), () => new Array(size + 1).fill(0));
    const filledBoard = fillBoard(initBoard, rectangle2x);
    // 상 우 하 좌
    const dir = [[0, 1], [1, 0], [0, -1], [-1, 0]];
    const visited = Array.from(Array(size + 1), () => new Array(size + 1).fill(0));
    const board  = filledBoard.slice();
    const [x, y] = [characterX2x, characterY2x];
    visited[x][y] = 1;

    const queue = [];
    queue.push([x, y]);
    while (queue.length > 0) {
        const [x, y] = queue.shift();
        for (let i = 0; i < 4; i++) {
            const [nx, ny] = [x + dir[i][0], y + dir[i][1]];
            if (nx >= 1 && nx <= size && ny >= 1 && ny <= size) {
                if (nx == itemX2x && ny == itemY2x) {
                    if (visited[nx][ny] == 0) {
                        visited[nx][ny] = visited[x][y] + 1;
                    } else {
                        visited[nx][ny] = Math.min(visited[nx][ny], visited[x][y] + 1);
                    }
                } else {
                    if (visited[nx][ny] == 0 && board[nx][ny] == 1) {
                        visited[nx][ny] = visited[x][y] + 1;
                        queue.push([nx, ny]);
                    }
                }
            }
        }
    }
    return Math.floor((visited[itemX2x][itemY2x] - 1) / 2);
}
