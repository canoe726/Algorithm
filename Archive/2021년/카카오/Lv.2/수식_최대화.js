function getPermutation (ops, pick) {
    const perm = [];
    const visited = Array.from({ length: ops.length }, () => false);
    
    function getPerm (cases) {
        if (cases.length == pick) {
            perm.push(cases);
            return;
        }
        for (let i = 0; i < ops.length; i++) {
            if (!visited[i]) {
                const nextCase = cases.slice();
                nextCase.push(ops[i]);
                
                visited[i] = true;
                getPerm(nextCase, pick);
                visited[i] = false;
            }
        }
    }
    getPerm([]);
    return perm;
}

function isDigit (ch) {
    return ch.match(/[0-9]/);
}

function calc (n1, n2, op) {
    if (op == '+') {
        return n1 + n2;
    } else if (op == '-') {
        return n1 - n2;
    } else {
        return n1 * n2;
    }
}

function solution(expression) {
    let answer = -1;
    
    const ops = ['+', '-', '*'];
    const cases = getPermutation(ops, 3);
    
    const nums = [];
    const operators = [];
    let number = '';
    for (let i = 0; i < expression.length; i++) {
        const ch = expression.charAt(i);
        if (isDigit(ch)) {
            number += ch;
        } else {
            nums.push(parseInt(number));
            number = '';
            operators.push(ch);
        }
    }
    if (number) {
        nums.push(parseInt(number));
    }
    
    cases.forEach(curCase => {
        let n = nums.slice();
        let o = operators.slice();
        
        for (let i = 0; i < curCase.length; i++) {
            const curOp = curCase[i];
            let calIdx;
            while (true) {
                calIdx = o.indexOf(curOp);
                if (calIdx < 0) {
                    break;
                }
                const numRes = calc(n[calIdx], n[calIdx + 1], curOp);
                n.splice(calIdx + 1, 1);
                n[calIdx] = numRes;
                
                o.splice(calIdx, 1);
            }
        }
        
        const result = Math.abs(n[0]);
        if (result > answer) {
            answer = result;
        }
    });
    return answer;
}
