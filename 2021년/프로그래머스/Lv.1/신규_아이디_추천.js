function solution(new_id) {
    var answer = new_id;
    answer = answer.toLowerCase();
    answer = answer.replace(/[^a-z0-9\-\_\.]/g, '');
    answer = answer.replace(/(\.){2,}/g, '.');
    answer = answer.replace(/^\.|\.$/g, '');
    if (answer.length == 0) {
        answer += 'a';
    }
    if (answer.length >= 16) {
        answer = answer.slice(0, 15);
        answer = answer.replace(/\.$/g, '');
    }
    if (answer.length <= 2) {
        const lastChar = answer[answer.length - 1];
        while (answer.length < 3) {
            answer += lastChar;
        }
    }
    return answer;
}
