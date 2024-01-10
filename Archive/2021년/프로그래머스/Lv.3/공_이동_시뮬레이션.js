// 좌 우 상 하
const dx = [ 0, 0, -1, 1]; // 행
const dy = [-1, 1,  0, 0]; // 열

function solution(n, m, x, y, queries) {
    let answer = -1;
    let top = x, bottom = x + 1, left = y, right = y + 1;
    const q = queries.reverse();
    for (let i = 0; i < q.length; i++) {
        const query = q[i];
        const [dir, dist] = query;
        let [nx, ny] = [-(dx[dir] * dist), -(dy[dir] * dist)];
        
        if (dir == 0) { // 원본: 좌, 역순: 오른쪽으로 좌표 이동
            if (left != 0) {
                left += ny;
            }
            right += ny;
            if (right > m) {
                right = m;
            }
        } else if (dir == 1) { // 원본: 우, 역순: 왼쪽으로 좌표 이동
            if (right != m) {
                right += ny;
            }
            left += ny;
            if (left < 0) {
                left = 0;
            }
        } else if (dir == 2) { // 원본: 상, 역순: 아래로 좌표 이동
            if (top != 0) {
                top += nx;
            }
            bottom += nx;
            if (bottom > n) {
                bottom = n;
            }
        } else if (dir == 3) { // 원본: 하, 역순: 위로 좌표 이동
            if (bottom != n) {
                bottom += nx;
            }
            top += nx;
            if (top < 0) {
                top = 0;
            }
        }
        if (top > n || bottom < 0 || left > m || right < 0) { // 역순 쿼리가 범위를 벗어난 경우
            return 0;
        }
    }
    return BigInt(BigInt(bottom - top) * BigInt(right - left));
}
