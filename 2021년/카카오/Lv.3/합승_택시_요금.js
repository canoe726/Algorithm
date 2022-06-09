function solution(n, s, a, b, fares) {
    s -= 1;
    a -= 1;
    b -= 1;
    const INF = 9876543210;
    let answer = INF;
    const dp = Array.from({ length: n },
         () => Array.from({ length: n }, () => INF));
    for (let i = 0; i < n; i++) {
        dp[i][i] = 0;
    }
    fares.forEach(fare => {
        const [start, end, cost] = fare;
        dp[start - 1][end - 1] = cost;
        dp[end - 1][start - 1] = cost;
    });
    
    for (let k = 0; k < n; k++) { // 거쳐가는 노드
        for (let i = 0; i < n; i++) { // 출발 노드
            for (let j = 0; j < n; j++) { // 도착 노드
                if (dp[i][j] > dp[i][k] + dp[k][j]) {
                    dp[i][j] = dp[i][k] + dp[k][j];
                }
            }
        }
    }
    for (let i = 0; i < n; i++) {
        let dist = dp[s][i];
        dist += (dp[i][a] + dp[i][b]);
        answer = Math.min(answer, dist);
    }
    return answer;
}
