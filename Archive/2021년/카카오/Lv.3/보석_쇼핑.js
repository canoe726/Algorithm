function solution(gems) {
    let answer = [];    
    const jewel = {};
    const uniqueGems = [...new Set(gems)];
    uniqueGems.forEach(uniqueGem => {
        jewel[uniqueGem] = 0;
    });
    
    let zeroCnt = uniqueGems.length;
    let minSize = 9876543210;
    let sIdx = 0;
    for (let eIdx = 0; eIdx < gems.length; eIdx++) {
        const gem = gems[eIdx];        
        jewel[gem] += 1;
        if (jewel[gem] == 1) {
            zeroCnt -= 1;
        }
        if (zeroCnt == 0) {
            let j;
            for (j = sIdx; j <= eIdx; j++) {
                const prevGem = gems[j];
                if (zeroCnt == 0) {
                    const size = eIdx - j + 1;
                    if (minSize > size) {
                        minSize = size;
                    }
                    answer.push({
                        size: size,
                        pos: [j, eIdx],
                    });
                }
                jewel[prevGem] -= 1;
                if (jewel[prevGem] == 0) {
                    zeroCnt += 1;
                    j += 1;
                    break;
                }
            }
            sIdx = j;
        }
    }
    let pos = answer.filter(item => item.size == minSize);
    pos = pos.map(item => item.pos).sort((a, b) => a[0] - b[0])[0];    
    return [pos[0] + 1, pos[1] + 1];
}
