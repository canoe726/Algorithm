function solution(arr1, arr2) {    
    const aRow = arr1.length;
    const aCol = arr1[0].length;
    const bRow = arr2.length;
    const bCol = arr2[0].length;
    let answer = Array.from({ length: aRow }, () => Array.from({ length: bCol }, () => 0));

    for (let r = 0; r < aRow; r++) {
        for (let c = 0; c < bCol; c++) {
            for (let k = 0; k < aCol; k++) {
                answer[r][c] += arr1[r][k] * arr2[k][c];
            }
        }
    }
    return answer;
}
