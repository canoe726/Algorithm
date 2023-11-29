function getNary (n, k) {
    const result = [];
    while (n > 0) {
        result.push(n % k);
        n = Math.floor(n / k);
    }
    return result.reverse().join('');
}

function isPrime (num) {
    for (let i = 2; i <= Math.floor(Math.sqrt(num)); i++) {
        if (num % i == 0) {
            return false;
        }
    }
    return true;
}

function solution(n, k) {
    let answer = 0;
    const num = getNary(n, k);
    let left = false;
    let right = false;
    let P = '';
    for (let i = 0; i < num.length; i++) {
        if (num.charAt(i) == '0') {
            if (i - 1 > 0 && !left) {
                left = num.charAt(i) == '0';
            }
            if (i + 1 < num.length) {
                right = num.charAt(i) == '0';
            }
            if ((left) || (left && right) || (right)) {
                if (P.length > 0) {
                    const number = parseInt(P);
                    if (number > 1 && isPrime(number)) {
                        answer += 1;
                    }
                    left = false;
                    right = false;
                    P = '';
                }
            }
        } else {
            P += num.charAt(i);
        }
    }
    if ((P.length > 0)) {
        const number = parseInt(P);
        if (number > 1 && isPrime(number)) {
            answer += 1;
        }
        left = false;
        right = false;
        P = '';
    }
    return answer;
}
