function getBinary (num, n) {
    let binary = [];
    while (num > 0) {
        binary.push(num % 2);
        num = Math.floor(num / 2);
    }
    while (binary.length < n) {
        binary.push(0);
    }
    return binary.reverse();
}

function solution(n, arr1, arr2) {
    let answer = [];
    
    const newArr1 = arr1.map(row => {
        return getBinary(row, n);
    });
    const newArr2 = arr2.map(row => {
        return getBinary(row, n);
    });

    for (let r = 0; r < n; r++) {
        let str = '';
        for (let c = 0; c < n; c++) {
            if (newArr1[r][c] == 0 && newArr2[r][c] == 0) {
                str += ' ';
            } else {
                str += '#';
            }
        }
        answer.push(str);
    }
    return answer;
}
