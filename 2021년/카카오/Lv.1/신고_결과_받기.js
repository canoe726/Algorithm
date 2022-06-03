function solution(id_list, report, k) {
    let answer = [];

    const user = {};
    id_list.forEach(id => {
        if (!(id in user)) {
            user[id] = {
                myReports: new Set(),
                numOfReport: 0,
                numOfMail: 0,
            };
        }
    });
    
    for (let i = 0; i < report.length; i++) {
        const r = report[i];
        const [from, to] = r.split(' ');
        user[from].myReports.add(to);
    }
    
    Object.entries(user).forEach(([key, value]) => {
        const myReports = user[key].myReports;
        for (const myReport of myReports) {
            user[myReport].numOfReport += 1;
        }
    });
    
    Object.entries(user).forEach(([key, value]) => {
        const myReports = user[key].myReports;
        for (const myReport of myReports) {
            if (user[myReport].numOfReport >= k) {
                user[key].numOfMail += 1;
            }
        }
    });
    
    id_list.forEach(id => {
        answer.push(user[id].numOfMail);
    });
    
    return answer;
}
