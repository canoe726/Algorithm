function get2dArr(n) {
    return Array.from({ length: n }, () => []);
}

function getUserIdMap(user_id) {
    const userIdMap = new Map();
    const size = user_id.length;
    for (let i = 0; i < size; i++) {
        userIdMap.set(user_id[i], false);
    }
    return userIdMap;
}

function checkContain(bannedItem, userItem) {
    const bLen = bannedItem.length;
    const uLen = userItem.length;
    if (bLen != uLen) {
        return false;
    } else {
        let isContain = true;
        for (let i = 0; i < bLen; i++) {
            if (bannedItem[i] == '*') {
                continue;
            } else {
                if (bannedItem[i] != userItem[i]) {
                    isContain = false;
                    break;
                }
            }
        }
        return isContain;
    }
}

function getBannedUserList(user_id, banned_id) {
    const uLen = user_id.length;
    const bLen = banned_id.length;
    let bannedUserList = get2dArr(bLen);
    
    for (let i = 0; i < bLen; i++) {
        let selectedUser = [];
        for (let j = 0; j < uLen; j++) {
            if (checkContain(banned_id[i], user_id[j])) {
                selectedUser.push(user_id[j]);
            }
        }
        bannedUserList[i] = selectedUser;
    }
    return bannedUserList;
}

let answer = [];

function findUserCase(userIdMap, bannedUserList, start, caseList) {
    let bLen = bannedUserList.length;
    if (caseList.length == bLen) {
        answer.push(caseList);
        return;
    } else {
        for (let i = start; i < bLen; i++) {
            const bUserLen = bannedUserList[i].length;
            for (let j = 0; j < bUserLen; j++) {
                const selected = userIdMap.get(bannedUserList[i][j]);
                if (selected) continue;
                userIdMap.set(bannedUserList[i][j], true);
                findUserCase(userIdMap, bannedUserList, i + 1, [...caseList, bannedUserList[i][j]]);
                userIdMap.set(bannedUserList[i][j], false);
            }
        }
    }
}

function solution(user_id, banned_id) {
    const userIdMap = getUserIdMap(user_id);
    const bannedUserList = getBannedUserList(user_id, banned_id)
    findUserCase(userIdMap, bannedUserList, 0, []);
    
    for (let i = 0; i < answer.length; i++) {
        answer[i] = answer[i].sort();
    }
    answer = new Set(answer.map(item => item.join('')));
    answer = [...answer];
    return answer.length;
}


