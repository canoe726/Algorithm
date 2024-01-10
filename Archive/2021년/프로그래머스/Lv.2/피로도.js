function getPermutation (indexes) { // 8! = 40320
    const perm = [];
    const pick = indexes.length;
    const visited = Array.from({ length: pick }, () => false);
    
    function getPerm (nums) {
        if (nums.length == pick) {
            perm.push(nums);
            return;
        }
        for (let i = 0; i < indexes.length; i++) {
            if (!visited[i]) {
                visited[i] = true;
                
                const nextNums = nums.slice();
                nextNums.push(indexes[i]);
                getPerm(nextNums);
                
                visited[i] = false;
            }
        }
    }
    getPerm([]);
    return perm;
}

function solution(k, dungeons) {
    let answer = -1;
    
    const indexes = Array.from({ length: dungeons.length }, (_, i) => i);
    const perms = getPermutation(indexes);
    
    perms.forEach(perm => {
        let cnt = 0;
        let energy = k;
        perm.forEach((dIdx) => {
            const [need, required] = dungeons[dIdx];
            if (energy >= need) {
                energy -= required;
                cnt += 1;
            }
        });
        
        if (cnt > answer) {
            answer = cnt;
        }
    });
    
    return answer;
}
