function solution(land) {
    const row = land.length + 1;
    const col = 4;
    const dp = Array.from({ length: row }, () => Array.from({ length: col }, () => 0));
    for (let i = 1; i < row; i++) {
        for (let j = 0; j < col; j++) {
            for (let k = 0; k < col; k++) {
                if (j == k) {
                    continue;
                }
                dp[i][j] = Math.max(dp[i][j], land[i - 1][j] + dp[i - 1][k]);
                
            }
        }
    }
    return Math.max(...dp[row - 1]);
}
