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
