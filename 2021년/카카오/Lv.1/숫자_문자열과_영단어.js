const words = ['zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine'];

function getNumber (str) {
    for (let i = 0; i < words.length; i++) {
        const word = words[i];
        const reg = new RegExp(`^${str}*`);
        if (word.match(reg)) {
            return [i, word.length];
        }
    }
    return [-1, -1];
}

function isDigit (ch) {
    return ch.match(/[0-9]/);
}

function solution(s) {
    let answer = [];
    
    let first = '';
    for (let i = 0; i < s.length; i++) {
        const ch = s.charAt(i);
        
        if (!isDigit(ch)) {
            if (first.length < 3) {
                first += ch;
            }
        }
        if (first.length == 3) {
            const [number, len] = getNumber(first);
            i += (len - 3);
            answer.push(String(number));
            first = '';
        }
        if (isDigit(ch)) {
            answer.push(ch);
        }
    }
    return parseInt(answer.join(''));
}
