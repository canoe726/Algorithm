function getNumber (number) {
    let binary = [];
    
    while (number > 0) {
        binary.push(number % 2);
        number = Math.floor(number / 2);
    }
    binary.push(0);
    binary = binary.slice().reverse();
    
    for (let i = binary.length - 1; i >= 0; i--) {
        if (binary[i] == 0) {
            [binary[i], binary[i + 1]] = [binary[i + 1], binary[i]];
            break;
        }
    }
    let nextNumber = 0;
    let two = 1;
    for (let i = binary.length - 1; i >= 0; i--) {
        nextNumber = nextNumber + binary[i] * two;
        two *= 2;
    }
    return nextNumber;
}

function solution(numbers) {
    let answer = [];
    numbers.forEach(number => {
        if (number % 2 == 0) {
            answer.push(number + 1);
        } else {
            const num = getNumber(number);
            answer.push(num);
        }
    });
    return answer;
}
