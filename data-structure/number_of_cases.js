function getPermutation(arr, n) {
    if (n == 1) return arr.map((v) => [v]);
    let result = [];
    arr.forEach((val, idx, arr) => {
        const rest = arr.filter((_, index) => idx != index);
        const perm = getPermutation(rest, n - 1);
        const nextVal = perm.map(p => [val, ...p]);
        result.push(...nextVal);
    });
    return result;
}

function getPermutation2(inputArr) {
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

function getCombination(arr, n) {
    if (n == 1) return arr.map((v) => [v]);
    let result = [];
    arr.forEach((val, idx, arr) => {
        const rest = arr.slice(idx + 1);
        const comb = getCombination(rest, n - 1);
        const nextVal = comb.map(c => [val, ...c]);
        result.push(...nextVal);
    });
    return result;
}
