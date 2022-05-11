function solution(a) {
    const nums = Array.from({ length: a.length }, () => 0);
    for (let i = 0; i < a.length; i++) {
        nums[a[i]] += 1;
    }
    
    let star = 0;
    for (let i = 0; i < a.length; i++) {
        if (nums[i] == 0) continue;
        if (nums[i] <= star) continue;
        
        let len = 0;
        for (let j = 0; j < a.length - 1; j++) {
            if (a[j] == a[j + 1]) continue;
            if (a[j] != i && a[j + 1] != i) continue;
            
            len += 1;
            j += 1;
        }
        if (len > star) {
            star = len;
        }
    }
    
    return star * 2;
}
