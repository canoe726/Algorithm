function isRight (p) {
    const stack = [];
    for (let i = 0; i < p.length; i++) {
        if (p.charAt(i) == '(') {
            stack.push('(');
        } else {
            if (stack.length == 0) {
                return false;
            }
            stack.pop();
        }
    }
    return stack.length == 0;
}

function isBalanced (str) {
    let left = 0;
    let right = 0;
    for (let i = 0; i < str.length; i++) {
        if (str.charAt(i) == '(') {
            left += 1;
        } else {
            right += 1;
        }
    }
    return left == right;
}

function makeRight (p) {
    if (p.length == 0) { // 1.
        return '';
    }
    
    let u = '', v = '';
    let sSize = 2;
    for (let i = 0; i < p.length; i+=2) { // 2.
        const s = p.slice(0, sSize);
        if (isBalanced(s)) {
            u = s;
            v = p.slice(sSize);
            break;
        }
        sSize += 2;
    }
    
    if (isRight(u)) { // 3.
        const res = makeRight(v);
        const ret = (u + res); // 3.1
        return ret;
    } else { // 4.
        let str = '('; // 4.1
        const res = makeRight(v);
        str += res;
        str += ')';
        
        let newU = '';
        let splitedU = u.slice(1, u.length - 1);
        for (let i = 0; i < splitedU.length; i++) {
            if (splitedU.charAt(i) == '(') {
                newU += ')';
            } else {
                newU += '(';
            }
        }
        str += newU;
        return str;
    }
}

function solution(p) {
    let answer = '';
    
    if (isRight(p)) {
        return p;
    } else {
        return makeRight(p);
    }
    return answer;
}
