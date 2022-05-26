function solution (n, money) {
    var answer = 0;
    const MOD = 1e9 + 7;
    const dp = Array.from({ length: n + 1 }, () => 0);
    dp[0] = 1;
    
    for (let mIdx = 0; mIdx < money.length; mIdx++) { // mIdx 동전을 사용해서 price 만드는 방법 계속 누적
        for (let price = 1; price <= n; price++) {
            if (price >= money[mIdx]) { // 만들고 싶은 금액이 사용하려는 동전의 금액보다 크거나 같아야함
                dp[price] = (dp[price] + dp[price - money[mIdx]]) % MOD;
            }
        }
    }
    return dp[n];
}
