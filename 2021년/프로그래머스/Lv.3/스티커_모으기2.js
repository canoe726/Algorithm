function solution(sticker) {
    const len = sticker.length;
    // 배열의 길이는 1이상
    if (len == 1) {
        return sticker[0];
    }
    // 첫 번째 스티커를 뜯은 경우
    const dp = new Array(len).fill(0);
    dp[0] = sticker[0];
    dp[1] = sticker[0];
    // 첫 번째 스티커는 뜯지않고 두 번째 스티커를 뜯은 경우
    const dp2 = new Array(len).fill(0);
    dp2[0] = 0;
    dp2[1] = sticker[1];
    
    for (let i = 2; i < len - 1; i++) {
        // (현재 스티커를 뜯은 경우 + 이전 스티커는 뜯을 수 없으므로 두 번째 전 스티커를 뜯은 최대값, 이전 최대 합)
        dp[i] = Math.max(sticker[i] + dp[i - 2], dp[i - 1]);
    }
    for (let i = 2; i < len; i++) {
        dp2[i] = Math.max(sticker[i] + dp2[i - 2], dp2[i - 1]);
    }
    let max1 = Math.max(...dp);
    let max2 = Math.max(...dp2);
    return max1 >= max2 ? max1 : max2;
}
