function solution(n) {
    let answer = 0;
    const size = 10000;
    const psum = Array.from({ length: size + 1 }, () => 0);
    
    for (let i = 1; i <= size; i++) {
        psum[i] = i;
    }
    for (let i = 1; i <= size; i++) {
        psum[i] = i + psum[i - 1];
    }
    
    for (let i = 1; i <= size; i++) {
        for (let j = i; j < size; j++) {
            const num = psum[j] - psum[j - i];
            if (num > n) {
                break;
            }
            if (n == num) {
                answer += 1;
            }
        }
    }
    
    return answer;
}
