function getPermutation(inputArr) {
    let result = [];
    function permute(arr, m = []) {
        if (arr.length == 0) {
            result.push(m);
        } else {
            for (let i = 0; i < arr.length; i++) {
                const perm = arr.slice();
                const value = perm.splice(i, 1);
                permute(perm.slice(), m.concat(value));
            }
        }
    }
    permute(inputArr);
    return result;
}

function check(weak, dist) {
    let friends = 0;
    let last = 0;
    let wIdx = 0;
    let canCheck = false;
    
    while (wIdx < weak.length && friends < dist.length) {
        last = weak[wIdx] + dist[friends];
        friends += 1;
        if (last >= weak[weak.length - 1]) { // 점검할 수 있는 경우
            canCheck = true;
            break;
        }
        for (let i = wIdx + 1; i < weak.length; i++) {
            if (weak[i] > last) {
                wIdx = i;
                break;
            }
        }
    }
    if (canCheck) {
        return friends;
    } else {
        return -1;
    }
}

// 8!*15*15 = 900만
function solution(n, weak, dist) {
    const INF = 987654321;
    let answer = INF;
    const circle = []; // weak 원순열
    circle.push(weak.slice());
    for (let i = 1; i < weak.length; i++) {
        const newWeak = circle[circle.length - 1].slice();
        const front = newWeak.shift() + n;
        newWeak.push(front);
        circle.push(newWeak);
    }
    const perm = getPermutation(dist); // 모든 dist를 투입하는 순서 만들기
    circle.forEach(c => {
        perm.forEach(p => {
            const result = check(c, p); // 모두 점검 가능하면 최솟값 계산
            if (result >= 0) {
                answer = Math.min(answer, result);
            }
        });
    });
    if (answer == INF) {
        return -1;
    } else {
        return answer;
    }
}
