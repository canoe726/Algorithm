function Stack () {
    const stack = [];
    
    function empty () {
        return stack.length == 0;
    }
    
    function push (data) {
        stack.push(data);
    }
    
    function pop () {
        if (!empty()) {
            return stack.pop();
        } else {
            return null;
        }
    }
    
    function top () {
        return stack[stack.length - 1];
    }
    
    return {
        push: push,
        pop: pop,
        top: top,
        empty: empty,
    }
}

function isValid (str) {
    const stack = Stack();
    let valid = true;
    let ch = '';
    let top = '';
    for (let i = 0; i < str.length; i++) {
        ch = str.charAt(i);
        if (ch == '(' || ch == '[' || ch == '{') {
            stack.push(ch);
        } else {
            if (stack.empty()) {
                valid = false;
                break;
            }
            top = stack.pop();
            if ((top == '(' && ch == ')') ||
                (top == '[' && ch == ']') ||
                (top == '{' && ch == '}')) {
                continue;
            } else {
                valid = false;
                break;
            }
        }
    }
    if (!stack.empty()) {
        valid = false;
    }
    return valid;
}

function getShifted (str) {
    const arr = str.split('');
    const front = arr.shift();
    arr.push(front);
    return arr.join('');
}

function solution(s) {
    let answer = 0;
    const size = s.length;
    let next = s.slice();
    for (let i = 0; i < size; i++) {
        const shifted = getShifted(next);
        if (isValid(shifted)) {
            answer += 1;
        }
        next = shifted.slice();
    }
    return answer;
}
