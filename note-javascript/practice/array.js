function get1dArr(val, size) {
    return Array.from({length: size}, () => val);
}

function get2dArr(val, s1, s2) {
    return Array.from({length: s1}, () => get1dArr(val, s2));
}
