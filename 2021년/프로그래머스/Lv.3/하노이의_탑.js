function solution(n) {
    let answer = [];
    
    function move (n, s, e) {
        answer.push([s, e]);
    }
    
    function hanoi (n, s, e, via) {
        if (n == 1) {
            move(n, s, e);
        } else {
            hanoi(n - 1, s, via, e);
            move(n, s, e);
            hanoi(n - 1, via, e, s);
        }
    }
    hanoi(n, 1, 3, 2)
    return answer;
}
