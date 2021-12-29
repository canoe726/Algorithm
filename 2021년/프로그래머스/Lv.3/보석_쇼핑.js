function solution(gems) {
    const jewelsCnt = new Set(gems).size;
    let jewels = new Map();
    let answer = [0, gems.length];
    
    gems.forEach((gem, idx) => {
        // 오름차순
        jewels.delete(gem);
        jewels.set(gem, idx + 1);
        if (jewels.size == jewelsCnt) {
            const gap = [jewels.values().next().value, idx + 1];
            answer = answer[1] - answer[0] > gap[1] - gap[0] ? gap : answer;
        }
    });
    
    return answer;
}
