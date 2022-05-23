function gcd (a, b) {
    while (b > 0) {
        const c = a % b;
        a = b;
        b = c;
    }
    return a;
}

function lcm (a, b) {
    return Math.floor((a * b) / gcd(a, b));
}

function solution(arr) {
    const sorted = arr.sort((a, b) => a - b).reverse();
    
    let maxLcm = lcm(sorted[0], sorted[1]);
    for (let i = 2; i < sorted.length; i++) {
        maxLcm = lcm(maxLcm, sorted[i]);
    }
    return maxLcm;
}
