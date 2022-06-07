function rotate (src, kSize) {
    const rotated = Array.from({ length: kSize }, () => Array.from({ length: kSize }, () => 0));
    for (let i = 0; i < kSize; i++) {
        for (let j = 0; j < kSize; j++) {
            rotated[i][j] = src[kSize - j - 1][i];
        }
    }
    return rotated;
}

function checkFilter (lock, key, y, x, kSize, lSize) {
    let popCnt = 0;
    
    for (let r = y; r < y + kSize; r++) {
        for (let c = x; c < x + kSize; c++) {
            if (lock[r][c] == 1 && key[r - y][c - x] == 1) {
                return false;
            }
            if (lock[r][c] == 0 && key[r - y][c - x] == 1) {
                lock[r][c] = key[r - y][c - x];
            }
        }
    }
    
    for (let y = kSize; y < kSize + lSize; y++) {
        for (let x = kSize; x < kSize + lSize; x++) {
            if (lock[y][x] == 1) {
                popCnt += 1;
            }
        }
    }
    
    if (popCnt == (lSize * lSize)) {
        return true;
    } else {
        return false;
    }
}

function solution(key, lock) {
    const kSize = key.length;
    const lSize = lock.length;

    const newLockSize = lSize + (kSize * 2);
    const newLock = Array.from({ length: newLockSize },
              () => Array.from({ length: newLockSize }, () => 0));
    for (let y = kSize; y < kSize + lSize; y++) {
        for (let x = kSize; x < kSize + lSize; x++) {
            newLock[y][x] = lock[y - kSize][x - kSize];
        }
    }
    
    let rotated = key.map(item => item.slice()).slice();
    let canOpen = false;
    for (let r = 0; r < 4; r++) { // 시계방향으로 90도 회전
        rotated = rotate(rotated, kSize);

        for (let y = 0; y < kSize + lSize; y++) { // 키를 모든 가능한 방향으로 이동
            for (let x = 0; x < kSize + lSize; x++) {
                let nextLock = newLock.map(item => item.slice()).slice();
                if (checkFilter(nextLock, rotated, y, x, kSize, lSize)) {
                    canOpen = true;
                }
                nextLock = null;
            }
        }        
    }
    return canOpen;
}
