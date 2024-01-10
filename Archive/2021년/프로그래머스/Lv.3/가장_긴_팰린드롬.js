function isPalindrome(str) {
    const len = str.length;
    const half = Math.floor(str.length / 2);
    for (let i = 0; i < half; i++) {
        if (str.charAt(i) != str.charAt(len - 1 - i)) {
            return false;
        }
    }
    return true;
}

function solution(s) {
    let answer = 1;
    const sLen = s.length;
    for (let len = sLen; len >= 2; len--) {
        for (let start = 0; start <= sLen - len; start++) {
            const str = s.slice(start, start + len);
            if (isPalindrome(str)) {
                return len;
            }
        }
    }
    return answer;
}
