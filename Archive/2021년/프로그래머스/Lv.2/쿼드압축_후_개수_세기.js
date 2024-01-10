function check (arr, sy, sx, ey, ex) {
    const elem = arr[sy][sx];
    let isSame = true;
    for (let y = sy; y < ey; y++) {
        for (let x = sx; x < ex; x++) {
            if (elem != arr[y][x]) {
                isSame = false;
            }
        }
    }
    return isSame;
}

function solution(arr) {
    const answer = [0, 0];
    function compress (y, x, size) {
        if (check(arr, y, x, y + size, x + size)) {
            const num = arr[y][x];
            answer[num] += 1;
            return;
        }
        const half = Math.floor(size / 2);
        compress(y, x, half);
        compress(y + half, x, half);
        compress(y, x + half, half);
        compress(y + half, x + half, half);
    }
    compress(0, 0, arr.length);
    return answer;
}
