function solution(n) {
    const div = 3;
    let stack = [];
    
    while (n > 0) {
        if (parseInt(n % 3) == 0) {
            stack.push('4')
            n -= 1
        } else {
            stack.push(parseInt(n % 3) + '')
        }
        n = parseInt(n / 3)
    }
    stack = stack.reverse()
    
    return stack.join('');
}
