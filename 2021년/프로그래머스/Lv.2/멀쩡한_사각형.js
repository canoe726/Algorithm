function gcd (a, b) {
    while (b > 0) {
        let r = a % b;
        a = b;
        b = r;
    }
    return a;
}

function solution(w, h) {
    const a = BigInt(w * h);
    const b = w > h ? (w + h - gcd(h, w)) : (w + h - gcd(w, h));
    
    return a - BigInt(b);
}
