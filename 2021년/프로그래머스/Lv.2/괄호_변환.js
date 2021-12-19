function getUV(p) {
    let u = '';
    let v = '';
    // '(', ')'
    let cnt = [0, 0];
    const pArr = p.split('');
    let pIdx = 0;
    for (pIdx = 0; pIdx < pArr.length; pIdx++) {
        if (cnt[0] > 0 && cnt[1] > 0 && cnt[0] == cnt[1]) {
            break;
        }
        if (pArr[pIdx] == '(') {
            cnt[0] += 1;
        } else {
            cnt[1] += 1;
        }
        u += pArr[pIdx];
    }
    v = pArr.slice(pIdx).join('');
    return [u, v];
}

function checkBalenced(u) {
    let isBalenced = true;
    let uStack = [];
    let uArr = u.split('');
    for (let uIdx = 0; uIdx < uArr.length; uIdx++) {
        if (u[uIdx] == '(') {
            uStack.push('(');
        } else {
            if (uStack.length == 0) {
                isBalenced = false;
                break;
            }
            uStack.pop();
        }
    }
    if (uStack.length > 0) {
        isBalenced = false;
    }
    return isBalenced;
}

function reverseString(str) {
    let result = '';
    for (let idx = 0; idx < str.length; idx++) {
        if (str[idx] == '(') {
            result += ')';
        } else {
            result += '(';
        }
    }
    return result;
}

function getAnswer(p) {
    if (p.length == 0) {
        return p;
    } else {
        let uv = getUV(p);
        if (!checkBalenced(uv[0])) {
            let result = '(' + getAnswer(uv[1]) + ')';
            let balencedU = uv[0];
            balencedU = balencedU.slice(1, balencedU.length - 1);
            balencedU = reverseString(balencedU);
            result += balencedU;
            return result;
        } else {
            const balencedV = getAnswer(uv[1]);
            uv[1] = balencedV;
        }
        return uv.join('');
    }
}

function solution(p) {
    return getAnswer(p);
}

