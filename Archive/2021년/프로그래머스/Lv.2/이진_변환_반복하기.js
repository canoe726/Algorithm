function deleteZero (str) {
    const ones = [];
    for (let i = 0; i < str.length; i++) {
        if (str.charAt(i) == '1') {
            ones.push(1);
        }
    }
    const zeros = str.length - ones.length;
    return [ones.join(''), zeros];
}

function convert (str) {
    let num = str.length;
    let converted = [];
    
    while (num > 0) {
        converted.push(num % 2);
        num = Math.floor(num / 2);
    }
    
    return converted.reverse().join('');
}

function solution(s) {
    let answer = [];
    let transform = 0;
    let zeroCnt = 0;
    
    let str = s;
    while (str.length > 1) {
        const [nextStr, zeros] = deleteZero(str);
        str = convert(nextStr);
        transform += 1;
        zeroCnt += zeros;
    }
    answer[0] = transform;
    answer[1] = zeroCnt;
    
    return answer;
}
