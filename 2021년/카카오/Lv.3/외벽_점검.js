function getPermutation (num, pick) {
    const perm = [];
    const size = num.length;
    const visited = Array.from({ length: size }, () => false);

    function getPerm (picked) {
        if (picked.length == pick) {
            perm.push(picked.slice());
            return;
        }
        for (let i = 0; i < size; i++) {
            if (!visited[i]) {
                visited[i] = true;
                
                const nextPerm = picked.slice();
                nextPerm.push(num[i]);
                getPerm(nextPerm);
                
                visited[i] = false;
            }
        }
    }
    getPerm([]);
    return perm;
}

function findWeakPoint (start, restaurant, dist, weakSize) {
    const size = restaurant.length;
    let friends = 0;
    let check = 0;
    let distIdx = 0;
    for (let i = start; i < size; i++) {
        if (check >= weakSize) {
            friends = distIdx;
            break;
        }
        if (distIdx >= dist.length) {
            break;
        }
        if (restaurant[i]) {
            let find = 0;
            for (let j = i; j <= i + dist[distIdx]; j++) {
                if (j >= size) {
                    break;
                }
                if (restaurant[j]) {
                    find += 1;
                }
            }
            check += find;
            if (find > 0) {
                i += (dist[distIdx]);
                distIdx += 1;
            }
        }
    }
    return friends;
}

function solution(n, weak, dist) {
    let answer = 0;
    const distPerms = getPermutation(dist, dist.length);

    const restaurant = Array.from({ length: (n * 2) }, () => false);
    for (let i = 0; i < weak.length; i++) {
        restaurant[weak[i]] = true;
    }
    for (let i = 0; i < weak.length; i++) {
        restaurant[n + weak[i]] = true;
    }
    
    const INF = 9876543210;
    const weakSize = weak.length;
    let friends = INF;
    for (let i = 0; i < n * 2; i++) {
        distPerms.forEach(distPerm => {
            const numOfPeople = findWeakPoint(i, restaurant, distPerm, weakSize);
            if (numOfPeople > 0 && friends > numOfPeople) {
                friends = numOfPeople;
            }
        });
    }
    if (friends == INF) {
        answer = -1;
    } else {
        answer = friends;
    }
    return answer;
}
