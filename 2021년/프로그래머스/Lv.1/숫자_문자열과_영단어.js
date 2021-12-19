function replaceStringToNumber(s) {
    let newS = s;
    newS = newS.replace(/zero/g, '0');
    newS = newS.replace(/one/g, '1');
    newS = newS.replace(/two/g, '2');
    newS = newS.replace(/three/g, '3');
    newS = newS.replace(/four/g, '4');
    newS = newS.replace(/five/g, '5');
    newS = newS.replace(/six/g, '6');
    newS = newS.replace(/seven/g, '7');
    newS = newS.replace(/eight/g, '8');
    newS = newS.replace(/nine/g, '9');
    
    let res = parseInt(newS);
    return res;
}

function solution(s) {
    let answer = replaceStringToNumber(s);
    return answer;
}
