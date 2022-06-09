function solution(n, selected, cmd) {
    let answer = '';
    let table = {};
    for (let i = 0; i < n; i++) {
        table[i] = {
            value: i,
            prev: undefined,
            next: undefined,
            removed: false,
        };
        if (i > 0) {
            table[i - 1].next = i;
            table[i].prev = i - 1;
        }
    }
    let tableSize = table.length;
    let store = [];
    cmd.forEach(command => {
        let [c, move] = command.split(' ');
        move = Number(move);
        if (c == 'U') {
            for (let i = 0; i < move; i++) {
                if (table[selected].prev >= 0) {
                    selected = table[selected].prev;
                }
            }
        } else if (c == 'D') {
            for (let i = 0; i < move; i++) {
                if (table[selected].next < n) {
                    selected = table[selected].next;
                }
            }
        } else if (c == 'C') {
            store.push([selected, { ...table[selected] }]);
            table[selected].removed = true;            
            const prev = table[selected].prev;
            const next = table[selected].next;
            if (table[prev] && table[next]) {
                table[prev].next = next;
                table[next].prev = prev;
                selected = next;
            } else if (table[prev]) {
                table[prev].next = next;
                selected = prev;
            } else if (table[next]) {
                table[next].prev = prev;
                selected = next;
            }
        } else {
            const [key, value] = store.pop();
            table[selected].removed = false;
            if (table[key].prev) {
                table[table[key].prev].next = key;
            }
            if (table[key].next) {
                table[table[key].next].prev = key;
            }            
        }
        
    });
    const keys = store.map(([k, v]) => k).sort((a, b) => a - b);
    let kIdx = 0;
    for (let i = 0; i < n; i++) {
        if (kIdx < keys.length) {
            if (keys[kIdx] == i) {
                answer += 'X';
                kIdx += 1;
            } else {
                answer += 'O';
            }
        } else {
            answer += 'O';
        }
    }
    return answer;
}
