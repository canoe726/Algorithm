// 양쪽에 모두 자신보다 작은 값이 있다면 터트리지 못함
function solution(a) {
    let answer = 0;
    const len = a.length;
    const left = new Array(len).fill(0);
    const right = new Array(len).fill(0);
    
    // left
    left[0] = a[0];
    for (let i = 1; i < len; i++) {
        left[i] = left[i - 1] > a[i] ? a[i] : left[i - 1];
    }
    // right
    right[len - 1] = a[len - 1];
    for (let i = len - 2; i >= 0; i--) {
        right[i] = right[i + 1] > a[i] ? a[i] : right[i + 1];
    }
    for (let i = 0; i < len; i++) {
        const l = i - 1;
        const r = i + 1;
        if (l < 0 || r >= len) {
            answer += 1;
        } else {
            let sideMin = 0;
            sideMin = sideMin + (a[i] > left[l] ? 1 : 0);
            sideMin = sideMin + (a[i] > right[r] ? 1 : 0);
            if (sideMin < 2) {
                answer += 1;
            }
        }
    }
    return answer;
}
