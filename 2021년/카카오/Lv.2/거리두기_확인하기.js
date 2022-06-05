function inRange (y, x, size) {
    if (y >= 0 && y < size && x >= 0 && x < size) {
        return true;
    } else {
        return false;
    }
}

const dy = [-1, 0, 1, 0]; // 상 우 하 좌
const dx = [0, 1, 0, -1];

function check (y, x, place, size) {
    const maxDist = 2;
    let result = true;

    for (let i = 0; i < 4; i++) { // 상 우 하 좌
        const [my, mx] = [y + (dy[i] * maxDist), x + (dx[i] * maxDist)];
        const [ny, nx] = [y + dy[i], x + dx[i]];
        if (inRange(ny, nx, size)) {
            if (place[ny].charAt(nx) == 'P') {
                result = false;
            }
        }
        if (inRange(my, mx, size) && inRange(ny, nx, size)) {
            if (place[my].charAt(mx) == 'P' && place[ny].charAt(nx) != 'X') {
                result = false;
            }
        }
    }
    
    for (let i = 0; i < 4; i+=2) { // 상 하
        for (let j = 1; j < 4; j+=2) { // 좌 우
            const [my, mx] = [y + dy[i], x + dx[j]];
            const [p1y, p1x] = [y + dy[i], x];
            const [p2y, p2x] = [y, x + dx[j]];
            if (inRange(my, mx, size) && inRange(p1y, p1x, size) && inRange(p2y, p2x, size)) {
                if ((place[my].charAt(mx) == 'P' && place[p1y].charAt(p1x) != 'X') ||
                    (place[my].charAt(mx) == 'P' && place[p2y].charAt(p2x) != 'X')) {
                    result = false;
                }
            }
        }
    }
    return result;
}

function solution(places) {
    const size = 5;    
    let answer = [];
    
    for (let i = 0; i < places.length; i++) {
        let result = 1;
        const place = places[i];
        for (let y = 0; y < size; y++) {
            for (let x = 0; x < size; x++) {
                if (place[y].charAt(x) == 'P') {
                    if (!check(y, x, place, size)) {
                        result = 0;
                    }
                }
            }
        }
        answer.push(result);
    }
    return answer;
}
