function solution(n) {
    const mod = 1234567;
    const size = 100000;
    const fibo = Array.from({ length: size + 1 }, () => 0);
    fibo[0] = 0;
    fibo[1] = 1;
    
    for (let i = 2; i < size + 1; i++) {
        fibo[i] = (fibo[i - 1] + fibo[i - 2]) % mod;
    }
    return fibo[n];
}
