function isDigit (ch) {
    return ch.match(/[0-9]/);
}

function solution(files) {
    let answer = [];
    
    let fn = [];  
    files.forEach(file => {
        let head = '';
        let number = '';
        let tail = '';
        let findDigit = false;
        let isTail = false;
        for (let i = 0; i < file.length; i++) {
            const ch = file.charAt(i);
            if (isDigit(ch)) {
                findDigit = true;
                if (isTail) {
                    tail += ch;
                } else {
                    number += ch;
                }
            } else {
                if (!findDigit) {
                    head += ch;
                } else {
                    tail += ch;
                    isTail = true;
                }
            }
        }
        const info = {
            fn: (head.toLowerCase() + number),
            head: head,
            number: number,
            tail: tail,
        };
        fn.push(info);
    });
    
    const regS = new RegExp(/[0-9]/g); // 문자열만
    const regN = new RegExp(/[^0-9]/g); // 숫자만
    fn = fn.sort((a, b) => {
        const afn = a.fn;
        const bfn = b.fn;
        const aStr = afn.replace(regS, '');
        const bStr = bfn.replace(regS, '');
        if (aStr == bStr) {
            const aNum = parseInt(afn.replace(regN, ''), 10);
            const bNum = parseInt(bfn.replace(regN, ''), 10);
            return (aNum == bNum) ? 0 : (aNum > bNum) ? 1 : -1;
        } else {
            return (aStr > bStr) ? 1 : -1;
        }
    });
    
    fn.forEach(filename => {
        const { fn, head, number, tail } = filename;
        answer.push(head + number + tail);
    });
    return answer;
}
