function Node(data) {
    this.data = data;
    this.prev = null;
    this.next = null;
}

function solution(n, k, cmd) {
    let answer = Array.from({ length: n }, () => 'O');
    
    let history = [];
    let root = new Node(0);
    let curNode = root;
    let prevNode = root;
    for (let idx = 1; idx < n; idx++) {
        const newNode = new Node(idx);
        newNode.prev = prevNode;

        prevNode.next = newNode;
        prevNode = newNode;
        if (idx == k) {
            curNode = newNode;
        }
    }
    
    cmd.forEach(commandLine => {
        const [command, cnt] = commandLine.split(' ');
        let i = 0;
        if (command == 'U') {
            while (i < parseInt(cnt) && curNode.prev) {
                curNode = curNode.prev;
                i += 1;
            }
        } else if (command == 'D') {
            while (i < parseInt(cnt) && curNode.next) {
                curNode = curNode.next;
                i += 1;
            }
        } else if (command == 'C') {
            history.push(curNode);
            const prev = curNode.prev;
            const next = curNode.next;
            
            if (prev && next) {
                prev.next = next;
                next.prev = prev;
                curNode = next;
            } else if (prev) {
                prev.next = null;
                curNode = prev;
            } else if (next) {
                next.prev = null;
                curNode = next;
            }
        } else if (command == 'Z') {
            const node = history.pop();
            const prevNode = node.prev;
            const nextNode = node.next;
            
            if (prevNode) {
                prevNode.next = node;
            }
            if (nextNode) {
                nextNode.prev = node;
            }
        }
    });
    
    history.forEach(item => {
        answer[parseInt(item.data)] = 'X';
    });
    return answer.join('');
}
