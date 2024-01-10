function getNumbers(expression) {
    let numbers = expression.split(/[-+\*]/);
    numbers = numbers.map(number => parseInt(number));
    return numbers;
}

function getOperators(expression) {
    let operators = expression.replace(/[0-9]/g, '');
    operators = operators.split('');
    return operators;
}

function doOperation(a, b, op) {
    if (op == '*') {
        return a * b;
    } else if (op == '+') {
        return a + b;
    } else if (op == '-') {
        return a - b;
    }
}

function calculate(numbers, operators, comb) {
    let tNumbers = numbers.slice();
    let tOperators = operators.slice();
    
    comb.forEach(combItem => {
        for (let tIdx = 0; tIdx < tOperators.length; tIdx++) {
            if (combItem == tOperators[tIdx]) {
                const value = doOperation(tNumbers[tIdx], tNumbers[tIdx + 1], tOperators[tIdx]);
                
                tNumbers = [...tNumbers.slice(0, tIdx), value, ...tNumbers.slice(tIdx + 2)];
                tOperators = [...tOperators.slice(0, tIdx), ...tOperators.slice(tIdx + 1)];
                tIdx -= 1;
            }
        }
    });
    return Math.abs(tNumbers[0]);
}

function DFS(numbers, operators, ops, depth, selected, comb) {
    let maxValue = -1;
    if (depth == ops.length) {
        const value = calculate(numbers, operators, comb);
        return Math.max(maxValue, value);
    }
    for (let idx = 0; idx < ops.length; idx++) {
        if (selected[idx]) continue;
        selected[idx] = true;
        maxValue = Math.max(maxValue, DFS(numbers, operators, ops, depth + 1, selected, [...comb, ops[idx]]));
        selected[idx] = false;
    }
    return maxValue;
}

function solution(expression) {
    const numbers = getNumbers(expression);
    const operators = getOperators(expression);
    const ops = ['*', '+', '-'];
    let selected = Array.from({ length: ops.length }, () => false);
    
    return DFS(numbers, operators, ops, 0, selected, []);
}
