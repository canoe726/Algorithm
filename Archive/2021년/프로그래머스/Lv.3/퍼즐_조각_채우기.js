const dy = [-1, 0, 1, 0]; // 상 우 하 좌
const dx = [0, 1, 0, -1];

function Queue () {
    let queue = [];
    
    function push (data) {
        queue.push(data);
    }
    
    function empty () {
        return queue.length == 0;
    }
    
    function pop () {
        return queue.shift();
    }
    
    return {
        push: push,
        empty: empty,
        pop: pop,
    };
}

function inRange (y, x, row, col) {
    if (y >= 0 && y < row && x >= 0 && x < col) {
        return true;
    } else {
        return false;
    }
}

function rotate (arr) { // 시계방향 90도, 정사각 행렬
    const size = arr.length;
    const rotated = Array.from({ length: size }, () => Array.from({ length: size }, () => size));
    for (let i = 0; i < size; i++) {
        for (let j = 0; j < size; j++) {
            rotated[i][j] = arr[size - 1 - j][i];
        }
    }
    let isFirstColumnEmpty = true;
    while (true) { // 첫 행은 빈 값이 없도록 조정
        for (let i = 0; i < size; i++) {
            if (rotated[i][0] == 1) {
                isFirstColumnEmpty = false;
            }
        }
        if (!isFirstColumnEmpty) {
            break;
        }
        for (let i = 0; i < size; i++) {
            for (let j = 1; j < size; j++) {
                rotated[i][j - 1] = rotated[i][j];
            }
        }
        for (let i = 0; i < size; i++) {
            rotated[i][size - 1] = 0;
        }
    }
    return rotated;
}

function searchGameBoard (sy, sx, game_board, visited) {
    const size = game_board.length;
    let ltY = 51, ltX = 51, rbY = -1, rbX = -1; // 좌상단 (y,x), 우하단 (y,x) 좌표
    
    const queue = Queue();
    queue.push([sy, sx]);
    while (!queue.empty()) {
        const [cy, cx] = queue.pop();
        visited[cy][cx] = true;

        ltY = Math.min(ltY, cy);
        ltX = Math.min(ltX, cx);
        rbY = Math.max(rbY, cy);
        rbX = Math.max(rbX, cx);
        
        for (let i = 0; i < 4; i++) {
            const [ny, nx] = [cy + dy[i], cx + dx[i]];
            if (!inRange(ny, nx, size, size)) {
                continue;
            }
            if (!visited[ny][nx] && game_board[ny][nx] == 0) {
                queue.push([ny, nx]);
            }
        }
    }
    const xDiff = rbX - ltX + 1;
    const yDiff = rbY - ltY + 1;
    const maxSize = yDiff > xDiff ? yDiff : xDiff;
    // 가장 긴 길이 기준 n*n 크기 퍼즐 리턴
    const puzzle = Array.from({ length: maxSize }, () => Array.from({ length: maxSize }, () => 0));
    let py = 0, px = 0;
    for (let i = ltY; i <= rbY; i++) {
        px = 0;
        for (let j = ltX; j <= rbX; j++) {
            const value = game_board[i][j] == 0 ? 1 : 0;
            puzzle[py][px] = value;
            px += 1;
        }
        py += 1;
    }
    return puzzle;
}

function getEmptyPuzzle (game_board) {
    const emptyPuzzle = [];
    const size = game_board.length;
    const visited = Array.from({ length: size }, () => Array.from({ length: size }, () => false));
    for (let i = 0; i < size; i++) {
        for (let j = 0; j < size; j++) {
            if (!visited[i][j] && game_board[i][j] == 0) {
                const puzzle = searchGameBoard(i, j, game_board, visited);
                emptyPuzzle.push(puzzle);
            }
        }
    }
    return emptyPuzzle;
}

function compare (arr1, arr2) {
    const a1Size = arr1.length;
    const a2Size = arr2.length;
    if (a1Size != a2Size) { // 모양이 다르게 생긴 경우
        return [false, 0];
    }
    const size = arr1.length;
    let isSame = true;
    let blockCnt = 0;
    for (let i = 0; i < size; i++) {
        for (let j = 0; j < size; j++) {
            if (arr1[i][j] != arr2[i][j]) { // 퍼즐 구성이 다른 경우
                isSame = false;
            }
            if (arr1[i][j] == 1) {
                blockCnt += 1;
            }
        }
    }
    return [isSame, blockCnt];
}

function solution(game_board, table) {
    let answer = 0;
    const emptyPuzzle = getEmptyPuzzle(game_board);
    const reversed = table.map(row => {
        return row.map(elem => {
            return elem == 0 ? 1 : 0;
        });
    });
    const tableShapes = getEmptyPuzzle(reversed);
    const tablePuzzle = tableShapes.map(tableShape => {
        const shapes = [];
        let rotated = tableShape.map(row => row.slice()).slice();
        shapes.push(rotated);
        for (let i = 0; i < 3; i++) {
            rotated = rotate(rotated);
            shapes.push(rotated);
        }
        return shapes;
    });
    
    const usedTable = Array.from({ length: tablePuzzle.length }, () => false);
    emptyPuzzle.forEach((ePuzzle, eIdx) => {
        for (let i = 0; i < tablePuzzle.length; i++) {
            if (!usedTable[i]) {
                const tPuzzle = tablePuzzle[i];
                let isFit = false;
                for (let j = 0; j < tPuzzle.length; j++) {
                    const puzzle = tPuzzle[j];
                    const [isSame, blockCnt] = compare(ePuzzle, puzzle);
                    if (isSame) {
                        usedTable[i] = true;
                        answer += blockCnt;
                        return;
                    }
                }
            }
        }
    });    
    return answer;
}
