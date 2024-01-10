function MinHeap () {
  let heap = [-1];

  function size () {
    return heap.length - 1;
  }

  function top () {
    return heap[1];
  }

  function empty () {
    return heap.length == 1;
  }

  function push (value) {
    heap.push(value);

    let child = size();
    let parent = Math.floor(child / 2);
    while (parent > 0) {
      if (heap[parent] > heap[child]) {
        let temp = heap[parent];
        heap[parent] = heap[child];
        heap[child] = temp;

        child = parent;
        parent = Math.floor(child / 2)
      } else {
        break;
      }
    }
  }

  function pop () {
    if (empty()) {
      return null;
    }
    const minValue = top();
    let temp = heap[1];
    heap[1] = heap[size()];
    heap[size()] = temp;
    heap.pop();

    let root = 1;
    while (true) {
      let left = root * 2;
      let right = (root * 2) + 1;
      let nextChild;
      if (left <= size() && right > size()) {
        nextChild = left;
      } else if (left > size() && right <= size()) {
        nextChild = right;
      } else if (left <= size() && right <= size()) {
        nextChild = heap[left] > heap[right] ? right : left;
      } else {
        break;
      }
      if (heap[nextChild] < heap[root]) {
        temp = heap[root];
        heap[root] = heap[nextChild];
        heap[nextChild] = temp;

        root = nextChild;
      } else {
        break;
      }
    }
    return minValue;
  }

  function print () {
    let printStr = '[';
    for (let i = 1; i <= size(); i++) {
      if (i == size()) {
        printStr += `${heap[i]}]`
      } else {
        printStr += `${heap[i]}, `
      }
    }
    console.log(printStr);
  }

  return { size, empty, push, pop, print };
}

function getCards (board, size) {
    const cards = [];
    for (let i = 0; i < size; i++) {
        for (let j = 0; j < size; j++) {
            if (board[i][j] > 0 && cards.indexOf(board[i][j]) < 0) {
                cards.push(board[i][j]);
            }
        }
    }
    return cards.sort((a, b) => a - b);
}

function getCardPos (board, size, numOfCard) {
    const cntOfCardType = 6;
    const cardPos = Array.from({ length: cntOfCardType + 1 }, () => []);
    for (let i = 0; i < size; i++) {
        for (let j = 0; j < size; j++) {
            if (board[i][j] > 0) {
                const card = board[i][j];
                cardPos[card].push([i, j]);
            }
        }
    }
    return cardPos;
}

function getPermutation (cards, pick) {
    const perm = [];
    const visited = Array.from({ length: pick }, () => false);
    
    function getPerm (elem) {
        if (elem.length == pick) {
            perm.push(elem);
            return;
        }
        
        for (let i = 0; i < cards.length; i++) {
            if (!visited[i]) {
                visited[i] = true;

                const nextElem = elem.slice();
                nextElem.push(cards[i]);
                getPerm(nextElem);
                
                visited[i] = false;
            }
        }
        
    }
    getPerm([]);
    return perm;
}

function inRange (r, c, size) {
    if (r >= 0 && r < size && c >= 0 && c < size) {
        return true;
    } else {
        return false;
    }
}

function getDist (pos, dst, board, size) {
    let cntOfKeyChange = 0;
    const dy = [-1, 0, 1,  0]; // 상 우 하 좌
    const dx = [ 0, 1, 0, -1];
    let visited = Array.from({ length: size },
              () => Array.from({ length: size },
              () => false));
    const pq = MinHeap();
    const [dstR, dstC] = dst;
    pq.push([0, ...pos]); // [이동횟수, r, c]
    
    while (!pq.empty()) {
        const top = pq.pop();
        if (!top) break;
        const [cD, curR, curC] = top;
        const curD = cD * -1;
        
        visited[curR][curC] = true;
        if (curR == dstR && curC == dstC) { // 목적지 도달
            cntOfKeyChange += curD;
            break;
        }
        
        for (let i = 0; i < 4; i++) { // 커서이동
            const [nextR, nextC] = [curR + dy[i], curC + dx[i]];
            if (!inRange(nextR, nextC, size)) {
                continue;
            }
            if (visited[nextR][nextC]) {
                continue;
            }
            pq.push([-(curD + 1), nextR, nextC]);
        }
        
        for (let i = 0; i < 4; i++) { // Ctrl + 커서이동
            let [ctrlR, ctrlC] = [curR, curC];            
            while (true) {
                ctrlR += dy[i];
                ctrlC += dx[i];
                
                if (!inRange(ctrlR, ctrlC, size)) { // 범위 초과
                    ctrlR -= dy[i];
                    ctrlC -= dx[i];
                    break;
                }
                if (board[ctrlR][ctrlC] > 0) { // 가장 가까운 카드
                    break;
                }
            }
            if (visited[ctrlR][ctrlC]) continue;
            pq.push([-(curD + 1), ctrlR, ctrlC]);
        }
    }
    visited = null;
    return cntOfKeyChange + 1; // Enter를 1번 누른 경우
}

function findMinPath (pos, cardPos, board, size) {
    // 1. 현재좌표 -> n번 카드(A) -> n번 카드(B)
    const firstWay = getDist(pos, cardPos[0], board, size) +
                     getDist(cardPos[0], cardPos[1], board, size);
    // 2. 현재좌표 -> n번 카드(B) -> n번 카드(A)
    const secondWay = getDist(pos, cardPos[1], board, size) + 
                      getDist(cardPos[1], cardPos[0], board, size);
    
    board[cardPos[0][0]][cardPos[0][1]] = 0; // 카드 제거
    board[cardPos[1][0]][cardPos[1][1]] = 0;
    
    if (firstWay < secondWay) {
        return [firstWay, cardPos[1]];
    } else {
        return [secondWay, cardPos[0]];
    }
}

function solution(board, r, c) {
    let answer = Number.MAX_SAFE_INTEGER;
    const size = 4;
    const cards = getCards(board, size);
    const cardPos = getCardPos(board, size, cards.length);
    const perms = getPermutation(cards, cards.length);
    perms.forEach(perm => {
        let minValue = 0;
        let nr = r;
        let nc = c;
        let newBoard = board.map(item => item.slice()).slice();
        perm.forEach((card) => {
            const [value, nextPos] = findMinPath([nr, nc], cardPos[card], newBoard, size);
            minValue += value;
            [nr, nc] = nextPos;
        });
        if (answer > minValue) {
            answer = minValue;
        }
        newBoard = null;
    });
    return answer;
}
