function getCombination (order, pick) {
    const comb = [];
    
    function getComb (menus, start) {
        if (menus.length == pick) {
            comb.push(menus.join(''));
            return;
        }        
        for (let i = start; i < order.length; i++) {
            const nextMenus = menus.slice();
            nextMenus.push(order.charAt(i));

            getComb(nextMenus, i + 1);
        }
    }
    getComb([], 0);
    return comb;
}

function solution(orders, course) {
    let answer = [];
    
    const orderInfo = {};
    orders.forEach(order => {
        for (let i = 2; i <= order.length; i++) {
            const comb = getCombination(order.split('').sort().join(''), i);
            comb.forEach(cases => {
                if (cases in orderInfo) {
                    orderInfo[cases].cnt += 1;
                } else {
                    orderInfo[cases] = { cnt: 1 };
                }
            });
        }
    });
    
    course.forEach(c => {
        let maxCnt = -1;
        const filtered = Object.entries(orderInfo).filter(([key, _]) => key.length == c);
        filtered.forEach(([key, value]) => {
            if (value.cnt > maxCnt) {
                maxCnt = value.cnt;
            }
        });
        const favorite = filtered.filter(([_, value]) => (value.cnt == maxCnt) && (value.cnt >= 2));
        favorite.forEach(([key, value]) => {
            answer.push(key);
        });
    });
    if (answer.length == 0) {
        answer.push('');
    }
    return answer.sort();
}
