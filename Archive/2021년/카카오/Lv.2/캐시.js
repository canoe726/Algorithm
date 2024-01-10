function solution(cacheSize, cities) {
    let answer = 0;    
    const cache = [];
    let time = [];
    cities = cities.map(item => item.toLowerCase());
    cities.forEach(city => {
        const fIdx = cache.indexOf(city);
        if (fIdx < 0) {
            if (cache.length < cacheSize) {
                cache.push(city);
                time.push(0);
            } else {
                const mIdx = time.indexOf(Math.max(...time));
                cache[mIdx] = city;
                time[mIdx] = 0;
            }
            answer += 5;
        } else {
            time[fIdx] = 0;
            answer += 1;
        }
        time = time.map(t => t + 1);
    });    
    return answer;
}
