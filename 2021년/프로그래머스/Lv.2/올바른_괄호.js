function Stack () {
    let stack = [];
    
    function empty () {
        return stack.length == 0;
    }
    
    function top () {
        return stack[stack.length - 1];
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
    
    return {
        top: top,
        push: push,
        pop: pop,
        empty: empty,
    }
}

function solution(s) {
    const stack = Stack();
    for (let i = 0; i < s.length; i++) {
        if (s[i] == '(') {
            stack.push(s[i]);
        } else {
            const top = stack.pop();
            if (top != '(') {
                return false;
            }
        }
    }
    if (!stack.empty()) {
        return false;
    }
    return true;
}
