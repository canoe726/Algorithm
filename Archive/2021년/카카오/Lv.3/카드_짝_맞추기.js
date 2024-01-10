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

  return { size, empty, push, pop };
}

const INF = 9876543210;
const dy = [-1, 0, 1,  0]; // 상 우 하 좌
const dx = [ 0, 1, 0, -1];

function getCardPos (board, size) {
    const pos = {};
    for (let y = 0; y < size; y++) {
        for (let x = 0; x < size; x++) {
            if (board[y][x] > 0) {
                const card = board[y][x];
                if (card in pos) {
                    pos[card].push([y, x]);
                } else {
                    pos[card] = [[y, x]];
                }
            }
        }
    }
    return pos;
}

function getCardTypes (board, size) {
    const types = [];
    for (let y = 0; y < size; y++) {
        for (let x = 0; x < size; x++) {
            if (board[y][x] > 0) {
                types.push(board[y][x]);
            }
        }
    }
    return [...new Set(types)].sort((a, b) => a - b);
}

function getPermutation (numbers, size) {
    const perm = [];
    const visited = Array.from({ length: size }, () => false);
    function getPerm (picked) {
        if (picked.length == size) {
            perm.push(picked.slice());
            return;
        }
        for (let i = 0; i < numbers.length; i++) {
            if (!visited[i]) {
                visited[i] = true;
                const nextPicked = picked.slice();
                nextPicked.push(numbers[i]);
                getPerm(nextPicked);
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

function dijkstra (board, size, start, end) {
    let minDist = INF;
    let visited = Array.from({ length: size },
            () => Array.from({ length: size }, () => false));
    const [ey, ex] = end;

    const pq = MinHeap();
    pq.push([0, ...start]);
    while (!pq.empty()) {
        let [dist, cy, cx] = pq.pop();
        visited[cy][cx] = true;
        dist = dist * -1;
        
        if (cy == ey && cx == ex) {
            minDist = Math.min(minDist, dist);
            break;
        }
        for (let i = 0; i < 4; i++) { // 방향키 이동
            const [ny, nx] = [cy + dy[i], cx + dx[i]];
            if (!inRange(ny, nx, size)) {
                continue;
            }
            if (!visited[ny][nx]) {
                pq.push([-(dist + 1), ny, nx]);
            }
        }
        for (let i = 0; i < 4; i++) { // Ctrl 방향키 이동
            let [ny, nx] = [cy, cx];
            while (true) {
                ny += dy[i];
                nx += dx[i];
                if (!inRange(ny, nx, size)) {
                    ny -= dy[i];
                    nx -= dx[i];
                    break;
                }
                if (board[ny][nx] > 0) {
                    break;
                }
            }
            if (!visited[ny][nx]) {
                pq.push([-(dist + 1), ny, nx]);
            }
        }
    }
    visited = null;
    return minDist;
}

function getMinCntBetweenTwo (board, size, r, c, pos, card) {
    const [A, B] = pos[card];
    const [ar, ac] = A;
    const [br, bc] = B;
    const dist1 = dijkstra(board, size, [r, c], A) + dijkstra(board, size, A, B);
    const dist2 = dijkstra(board, size, [r, c], B) + dijkstra(board, size, B, A);
    board[ar][ac] = 0;
    board[br][bc] = 0;
    if (dist1 < dist2) {
        return [br, bc, dist1 + 2];
    } else {
        return [ar, ac, dist2 + 2];
    }
}

function getKeyPressed (board, size, r, c, pos, perm) {
    let totalCnt = 0;
    for (let i = 0; i < perm.length; i++) {
        const [nr, nc, cnt] = getMinCntBetweenTwo(board, size, r, c, pos, perm[i]);
        r = nr;
        c = nc;
        totalCnt += cnt;
    }
    return totalCnt;
}

function solution(board, r, c) {
    const size = 4;
    const pos = getCardPos(board, size);
    const types = getCardTypes(board, size);
    const perm = getPermutation(types, types.length);
    let minCnt = INF;
    for (let i = 0; i < perm.length; i++) {
        let newBoard = board.map(item => item.slice()).slice();
        const cnt = getKeyPressed(newBoard, size, r, c, pos, perm[i]);
        minCnt = Math.min(minCnt, cnt);
        newBoard = null;
    }
    return minCnt;
}
