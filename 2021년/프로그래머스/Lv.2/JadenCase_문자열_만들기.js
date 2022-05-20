function solution(s) {
    const result = s.split(' ').map(str => {
        return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
    });
    return result.join(' ');
}
