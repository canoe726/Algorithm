const productCost = 100;

function getEnrollKey(enroll) {
    const key = {
        'center': 0
    };
    enroll.forEach((e, idx) => {
        key[e] = idx + 1;
    });
    return key;
}

function getKeyFromSeller(key, seller) {
    const sellerKey = [];
    return seller.map((s) => {
        return key[s];
    });
}

function getInitOrg(enroll, enrollKey, referral) {
    const org = [{
        'me': 'center',
        'referral': '-',
        'referralKey': -1,
        'money': 0
    }];
    
    enroll.forEach((e, idx) => {
        const person = {
            'me': e,
            'referral': referral[idx] == '-' ? 'center' : referral[idx],
            'referralKey': referral[idx] == '-' ? 0 : enrollKey[referral[idx]],
            'money': 0
        };
        org.push(person);
    });
    return org;
}

function divideMoney(totalMoney) {
    const refShare = Math.floor(totalMoney * 0.1);
    return [
        totalMoney - refShare,
        refShare
    ];
}

function divideRefMoney(org, selKey, refKey, totalMoney) {
    if (selKey < 0 || refKey < 0) {
        org[0].money += totalMoney;
        return;
    }
    
    const [myShare, refShare] = divideMoney(totalMoney);
    org[selKey].money += myShare;
    if (refShare > 0) {
        divideRefMoney(org, refKey, org[refKey].referralKey, refShare);
    }
}

function getMoney(org, sellerKey, amount) {
    sellerKey.forEach((selKey, idx) => {
        const totalMoney = amount[idx] * productCost;
        const refKey = org[selKey].referralKey;
        divideRefMoney(org, selKey, refKey, totalMoney);
    });
}

function solution(enroll, referral, seller, amount) {
    const enrollKey = getEnrollKey(enroll);
    const sellerKey = getKeyFromSeller(enrollKey, seller);
    const org = getInitOrg(enroll, enrollKey, referral);
    getMoney(org, sellerKey, amount);
    const result = org.reduce((acc, cur, idx, arr) => {
        if (idx > 0) {
            acc.push(cur.money);
            return acc;
        } else {
            return acc;
        }
    }, []);
    return result;
}
