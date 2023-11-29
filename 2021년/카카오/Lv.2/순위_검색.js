function getLowerIdx (arr, score) {
    let left = 0;
    let right = arr.length;
    while (left < right) {
        let mid = Math.floor((left + right) / 2);   
        const s = arr[mid];
        if (s < score) {
            left = mid + 1;
        } else {
            right = mid;
        }
    }
    return left;
}

function getCases (arr) {
    const cases = [];
    
    function getStr (picked, start) {
        if (picked.length == arr.length) {
            cases.push(picked.join(''));
            return;
        }
        for (let i = start; i < arr.length; i++) {
            let nextPicked = picked.slice();
            
            nextPicked.push(arr[i]);
            getStr(nextPicked, i + 1);
            
            nextPicked.pop();
            nextPicked.push('-');
            getStr(nextPicked, i + 1);
            nextPicked = null;
        }
    }
    getStr([], 0);
    return cases;
}

function solution(info, query) {
    const answer = [];
    const users = {};
    info.forEach(item => {
        const [language, field, career, soulfood, score] = item.split(' ');
        const cases = getCases([language, field, career, soulfood]);
        cases.forEach(key => {
            if (key in users) {
                users[key].push(score);
            } else {
                users[key] = [score];
            }
        });
    });
    
    for (const key in users) {
        users[key].sort((a, b) => a - b);
    }
    
    query.forEach(q => {
        const [key, score] = q.replace(/ and /g, '').split(' ');
        if (key in users) {
            const scores = users[key];
            const idx = getLowerIdx(scores, Number(score));
            answer.push(scores.length - idx);
        } else {
            answer.push(0);
        }
    });
    
    return answer;
}
