// (y,x) => (0,0) ~ (3,2)
// 1 2 3
// 4 5 6
// 7 8 9
// * 0 #
const phone = [
    { num: 0, y: 3, x: 1 },
    { num: 1, y: 0, x: 0 },
    { num: 2, y: 0, x: 1 },
    { num: 3, y: 0, x: 2 },
    { num: 4, y: 1, x: 0 },
    { num: 5, y: 1, x: 1 },
    { num: 6, y: 1, x: 2 },
    { num: 7, y: 2, x: 0 },
    { num: 8, y: 2, x: 1 },
    { num: 9, y: 2, x: 2 },
];
let leftPos = { y: 3, x: 0 };
let rightPos = { y: 3, x: 2 };

function solution(numbers, hand) {
    let answer = '';
    for (const number of numbers) {
        // leftHand
        if (number === 1 ||
            number === 4 ||
            number === 7) {
            leftPos = phone[number];
            answer += 'L';
        }
        // rightHand
        else if (number === 3 ||
                 number === 6 ||
                 number === 9) {
            rightPos = phone[number];
            answer += 'R';
        }
        // Determine
        else {
            const leftGap = Math.abs(phone[number].x - leftPos.x) + Math.abs(phone[number].y - leftPos.y);
            const rightGap = Math.abs(phone[number].x - rightPos.x) + Math.abs(phone[number].y - rightPos.y);
            
            if (leftGap === rightGap) {
                if (hand === 'right') {
                    rightPos = phone[number];
                    answer += 'R';
                } else {
                    leftPos = phone[number];
                    answer += 'L';
                }
            } else if (leftGap > rightGap) {
                rightPos = phone[number];
                answer += 'R';
            } else {
                leftPos = phone[number];
                answer += 'L';
            }
        }
    }
    return answer;
}
