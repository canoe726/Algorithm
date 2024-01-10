function solution(n, k) {
    let answer = [];
    const factorial = Array.from({ length: 21 }, () => 0);
    factorial[1] = 1;
    for (let i = 2; i <= 20; i++) {
        factorial[i] = i * factorial[i - 1];
    }

    const num = Array.from({ length: n }, (_, i) => i + 1);
    let K = k - 1;
    while (n > 1) {
        const groupSize = factorial[n - 1];
        const index = Math.floor(K / groupSize);
        answer.push(num[index]);
        num.splice(index, 1);
        K = K - (index * groupSize);
        n -= 1;
    }
    answer.push(num[K % 1]);
    num.splice(K % 1, 1);
    
    return answer;
}
