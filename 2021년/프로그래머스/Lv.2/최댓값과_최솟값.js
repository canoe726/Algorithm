function solution(s) {
    const nums = s.split(' ').map(item => parseInt(item));
    const max = Math.max(...nums);
    const min = Math.min(...nums);
    
    return `${min} ${max}`;
}
