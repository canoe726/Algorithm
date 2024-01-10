function permutationWithRep (src, pick) {
    const perm = [];
    
    function getPerm (p) {
        if (p.length == pick) {
            perm.push(p.join(''));
            return;
        }
        
        for (let i = 0; i < src.length; i++) {
            const nextP = p.slice();
            nextP.push(src[i]);
            getPerm(nextP);
        }
    }
    getPerm([]);
    return perm;
}

function solution(word) {
    let answer = 0;
    const wordList = ['A', 'E', 'I', 'O', 'U'];
    const words = [];
    
    for (let i = 1; i <= wordList.length; i++) {
        const perm = permutationWithRep(wordList, i);
        words.push(...perm.flat());
    }
    
    const sorted = words.sort();
    answer = sorted.indexOf(word) + 1;    
    return answer;
}
