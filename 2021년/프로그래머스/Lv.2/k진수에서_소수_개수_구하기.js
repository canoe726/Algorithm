function convert (n, digit) {
    let result = [];
    let num = n;
    while (num > 0) {
        result.push(num % digit);
        num = Math.floor(num / digit);
    }
    result = result.reverse();
    return result.join('');
}

function isPrime (num) {
    for (let i = 2; i*i <= num; i++) {
        if (num % i == 0) {
            return false;
        }
    }
    return true;
}

function solution(n, k) {
    let answer = 0;
    
    const converted = convert(n, k);
    let comp = '';
    let compNum;
    for (let i = 0; i < converted.length; i++) {
        if (converted[i] == '0' && comp.length > 0) {
            compNum = parseInt(comp);
            if (compNum > 1 && isPrime(compNum)) {
                answer += 1;
            }
            comp = '';
        }
        comp += converted[i];
    }
    if (comp.length > 0) {
        compNum = parseInt(comp);
        if (compNum > 1 && isPrime(compNum)) {
            answer += 1;
        }
    }
    return answer;
}
