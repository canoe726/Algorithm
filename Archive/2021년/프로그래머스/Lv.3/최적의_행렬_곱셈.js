function multiplyMat (a, b) {
    const [as, ae] = a;
    const [bs, be] = b;
    if (ae == bs) {
        return as * ae * be;
    } else {
        return 0;
    }
}

function getMultiplyTable (matrix_sizes) {
    const size = matrix_sizes.length;
    const table = Array.from({ length: size }, () => Array.from({ length: size }, () => null));
    for (let i = 0; i < size; i++) {
        for (let j = i; j < size; j++) {
            if (i == j) {
                table[i][j] = matrix_sizes[i];
            } else {
                table[i][j] = [matrix_sizes[i][0], matrix_sizes[j][1]];
            }
        }
    }
    return table;
}

/**
* 조건: 행렬의 순서는 항상 왼쪽에서 오른쪽으로 곱하는 것이 보장된다.
* 백준 파일 합치기 참고 (https://www.acmicpc.net/problem/11066)
* 크누스 최적화 가능한지 검토 필요
*/
function solution(matrix_sizes) {
    const INF = Number.MAX_SAFE_INTEGER;
    const size = matrix_sizes.length;
    const mt = getMultiplyTable(matrix_sizes);
    
    const dp = Array.from({ length: size }, () => Array.from({ length: size }, () => INF));
    for (let i = 0; i < size; i++) {
        dp[i][i] = 0;
    }
    
    for (let i = 0; i < size; i++) {
        for (let s = 0; s < size - i; s++) {
            let e = s + i;
            for (let k = s; k < e; k++) {
                dp[s][e] = Math.min(dp[s][e],
                                    multiplyMat(mt[s][k], mt[k + 1][e]) + (dp[s][k] + dp[k + 1][e]));
            }
        }
    }
    
    return dp[0][size - 1];
}
