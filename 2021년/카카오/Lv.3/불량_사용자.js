function compareStr (user, banned) {
    if (user.length == banned.length) {
        let sameCnt = 0;
        const size = user.length;
        for (let i = 0; i < size; i++) {
            if (banned.charAt(i) == '*') {
                sameCnt += 1;
            } else {
                if (user.charAt(i) == banned.charAt(i)) {
                    sameCnt += 1;
                } else {
                    return false;
                }
            }
        }
        if (sameCnt == size) {
            return true;
        } else {
            return false;
        }
    } else {
        return false;
    }
}

function getBannedList (user_id, banned_id) {
    const list = [];
    const visited = Array.from({ length: user_id.length }, () => false);
    
    function getList (picked, uStart, bStart) {
        if (bStart >= banned_id.length) {
            list.push(picked.slice());
            return;
        }
        for (let i = 0; i < user_id.length; i++) {
            if (!visited[i] && compareStr(user_id[i], banned_id[bStart])) {
                visited[i] = true;
                
                const nextPick = picked.slice();
                nextPick.push(user_id[i]);
                getList(nextPick, i + 1, bStart + 1);

                visited[i] = false;
            }
        }
    }
    getList([], 0, 0);
    return list;
}

function solution (user_id, banned_id) {
    let answer = 0;
    const bannedList = getBannedList(user_id, banned_id);
    answer = [...new Set(bannedList.map(item => item.sort()).map(item => item.join('')))].length;
    return answer;
}
