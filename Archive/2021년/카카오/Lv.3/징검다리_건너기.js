function solution(stones, k) {
    const INF = 9876543210;
    let start = 0;
    let end = INF;
    while (start <= end) {
        let mid = Math.floor((start + end) / 2);
        let canCross = true;
        let player = -1;
        let step = 1;
        while (player + step < stones.length) {
            if (stones[player + step] >= mid) {
                player = player + step;
                step = 1;
            } else {
                step += 1;
                if (step > k) {
                    canCross = false;
                    break;
                }
            }
        }
        if (canCross) {
            start = mid + 1;
        } else {
            end = mid - 1;
        }
    }
    return end;
}
