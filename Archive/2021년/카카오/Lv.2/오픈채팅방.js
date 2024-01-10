function solution(record) {
    let answer = [];
    
    const users = {};
    record.forEach(r => {
        if (r.match(/^Enter/) || r.match(/^Change/)) {
            const [cmd, uid, nickname] = r.split(' ');
            if (!(uid in users)) {
                users[uid] = {
                    nickname: nickname,
                };
            } else {
                users[uid].nickname = nickname;
            }
        }
    });
    
    record.forEach(r => {
        if (r.match(/^Enter/)) {
            const [cmd, uid, nickname] = r.split(' ');
            answer.push(`${users[uid].nickname}님이 들어왔습니다.`);
        } else if (r.match(/^Leave/)) {
            const [cmd, uid] = r.split(' ');
            answer.push(`${users[uid].nickname}님이 나갔습니다.`);
        }
    });
    
    return answer;
}
