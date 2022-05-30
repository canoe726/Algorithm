function solution(n, stations, w) {
    let answer = 0;
    
    let pos = 1;
    let si = 0;
    while (pos <= n) {
        if (si < stations.length && pos >= (stations[si] - w)) {
            pos = stations[si] + w + 1;
            si += 1;
        } else {
            answer += 1;
            pos += (2 * w + 1);
        }
    }
    return answer;
}
