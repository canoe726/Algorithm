// Ax + By + C = 0
function getPoint (line1, line2) {
    const [A, B, E] = line1;
    const [C, D, F] = line2;
    
    const d = (A*D) - (B*C);
    if (d == 0) { // 일치 또는 평행
        return null;
    } else {
        const x = ((B*F) - (E*D)) / ((A*D) - (B*C));
        const y = ((E*C) - (A*F)) / ((A*D) - (B*C));
        return [x, y];
    }
}

function isFloat (n) {
    return Number(n) === n && n % 1 !== 0;
}

function solution(line) {
    const INF = 1e20;
    const points = [];
    
    let minX = INF;
    let maxX = -INF;
    let minY = INF;
    let maxY = -INF;
    
    for (let i = 0; i < line.length - 1; i++) {
        for (let j = i + 1; j < line.length; j++) {
            const point = getPoint(line[i], line[j]);
            if (point) {
                const [x, y] = point;
                const isXFloat = isFloat(x);
                const isYFloat = isFloat(y);
                if (!isXFloat && !isYFloat) {
                    points.push(point);
                    if (x < minX) {
                        minX = x;
                    }
                    if (x > maxX) {
                        maxX = x;
                    }
                    if (y < minY) {
                        minY = y;
                    }
                    if (y > maxY) {
                        maxY = y;
                    }
                }
            }
        }
    }
    const rowSize = maxY - minY + 1;
    const colSize = maxX - minX + 1;
    let colStr = '';
    for (let i = 0; i < colSize; i++) {
        colStr += '.';
    }
    let board = Array.from({ length: rowSize }, () => colStr);
    points.map(point => {
        const [x, y] = point;
        const nx = (x - minX) < 0 ? -(x - minX) : (x - minX);
        const ny = (y - minY) < 0 ? -(y - minY) : (y - minY);
        const row = board[ny];
        board[ny] = row.substring(0, nx) + '*' + row.substring(nx + 1);
    });
    return board.reverse();
}
