function solution(new_id) {
    let answer = '';
    
    answer = new_id.toLowerCase(); // #1
    answer = answer.replace(/[^a-z0-9-_\.]/g, ''); // #2
    answer = answer.replace(/[\.]{2,}/g, '.'); // #3
    answer = answer.replace(/^\./, '').replace(/\.$/, ''); // #4
    answer = answer.length == 0 ? 'a' : answer; // #5
    answer = answer.length >= 16 ? answer.slice(0, 15) : answer; // #6
    answer = answer.replace(/\.$/g, ''); // #6-1
    if (answer.length <= 2) {
        const last = answer[answer.length - 1];
        while (answer.length < 3) {
            answer += last;
        }
    }
    return answer;
}
