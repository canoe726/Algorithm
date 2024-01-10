
function solution(msg) {
    const alphaNums = Array.from({ length: 26 }, (_, idx) => idx + 65);
    const dict = alphaNums.map(num => String.fromCharCode(num));
    
    let answer = [];
    let w = '';
    let nw = '';
    let c = '';
    for (let i = 0; i < msg.length; i++) {
        nw += msg.charAt(i);
        c = msg.charAt(i);
        
        if (dict.indexOf(nw) >= 0) {
            w += msg.charAt(i);
            continue;
        } else {
            answer.push(dict.indexOf(w) + 1);
            dict.push(w + c);
            
            nw = '';
            w = '';
            i -= 1;
        }
    }
    answer.push(dict.indexOf(w) + 1);
    return answer;
}
