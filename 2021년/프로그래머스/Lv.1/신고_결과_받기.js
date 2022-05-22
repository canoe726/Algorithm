function getReportList (users, report) {
    report.forEach(item => {
        const [from, to] = item.split(' ');
        if (users[from]['myReport'].indexOf(to) < 0) {
            users[from]['myReport'].push(to);
        }
    });
}

function getReportedCnt (users) {
    Object.entries(users).map(([key, value]) => {
        const myReport = users[key]['myReport'];
        myReport.forEach(report => {
            users[report]['reportedCnt'] += 1;
        });
    });
}

function getStoppedUsers (users, k) {
    Object.entries(users).map(([key, value]) => {
        const myReport = users[key]['myReport'];
        myReport.forEach(report => {
            if (users[report]['reportedCnt'] >= k) {
                users[key]['stoppedUsers'].push(report);
            }
        });
    });
}

function solution (id_list, report, k) {
    let answer = [];
    
    const users = {};
    id_list.forEach(id => {
        if (!(id in users)) {
            users[id] = {
                'reportedCnt': 0,
                'myReport': [],
                'stoppedUsers': [],
            }
        }
    });
    getReportList(users, report);
    getReportedCnt(users);
    getStoppedUsers(users, k);
    
    id_list.forEach(id => {
        answer.push(users[id]['stoppedUsers'].length);
    });
    return answer;
}
