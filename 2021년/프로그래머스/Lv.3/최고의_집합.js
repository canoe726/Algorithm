function solution(n, s) {
    const num = Math.floor(s / n);
    if (num == 0) {
        return [-1];
    }
    
    const nums = new Array(n).fill(num);
    const spare = s - num * n;
    for (let i = 0; i < spare; i++) {
        nums[nums.length - 1 - i] += 1;
    }
    return nums;
}
