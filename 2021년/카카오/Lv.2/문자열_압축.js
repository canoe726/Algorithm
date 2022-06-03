function solution(s) {
    let answer = Number.MAX_SAFE_INTEGER;
    let window = [];
    let compressed = '';
    for (let w = 1; w <= s.length; w++) {
        window = [];
        compressed = '';
        
        for (let i = 0; i < s.length; i++) {
            let wCnt = 0;
            const windowWord = s.slice(i, i + w);
            
            while (true) {
                let [sIdx, eIdx] = [i + w * (wCnt), i + w * (wCnt + 1)];
                const word = s.slice(sIdx, eIdx);
                if (windowWord == word) {
                    wCnt += 1;
                } else {
                    break;
                }
            }
            if (wCnt == 1) {
                compressed += windowWord;
            } else {
                compressed += `${wCnt}${windowWord}`;
            }
            i = i + w * (wCnt) - 1;
        }
        if (answer > compressed.length) {
            answer = compressed.length;
        }
    }
    return answer;
}
