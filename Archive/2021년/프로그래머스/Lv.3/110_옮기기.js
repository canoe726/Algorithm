function find110(str, stack) {
    let str110 = '';
    for (let i = 0; i < str.length; i++) {
        const third = str.charAt(i);
        if (stack.length >= 2) {
            const second = stack.pop();
            const first = stack.pop();
            if (first == '1' && second == '1' && third == '0') {
                str110 += '110';
                continue;
            }
            stack.push(first);
            stack.push(second);
        }
        stack.push(third);
    }
    return str110;
}

function solution(s) {
    let answer = [];
    for (let i = 0; i < s.length; i++) {
        const stack = [];
        const nextStr = find110(s[i], stack);
        if (nextStr.length == 0) {
            answer.push(s[i]);
        } else {
            const resultStr = stack.join('');
            const lastZero = resultStr.lastIndexOf('0') + 1;
            answer.push(resultStr.slice(0, lastZero) + nextStr + resultStr.slice(lastZero));
        }
    }
    return answer;
}
