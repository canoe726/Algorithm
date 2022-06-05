function parseString (s) {
    const nums = [];
    let result = s;
    result = result.slice(1, result.length - 1);
    result = result.split('{');
    for (let i = 0; i < result.length; i++) {
        let item = result[i];
        item = item.replace(/[}]/g, '');
        item = item.split(',');
        
        const arr = [];
        for (let j = 0; j < item.length; j++) {
            let elem = parseInt(item[j]);
            if (elem) {
                arr.push(elem);
            }
        }
        if (arr.length > 0) {
            nums.push(arr);
        }
    }
    return nums;
}

function solution(s) {
    const answer = [];
    const arr = parseString(s);
    const sorted = arr.sort((a, b) => a.length - b.length);
    
    for (let i = 0; i < sorted.length; i++) {
        const arr = sorted[i];        
        for (let j = 0; j < arr.length; j++) {
            if (answer.indexOf(arr[j]) < 0) {
                answer.push(arr[j]);
            }
        }
    }
    return answer;
}
