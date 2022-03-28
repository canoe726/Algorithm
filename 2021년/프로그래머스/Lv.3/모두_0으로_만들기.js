function makeGraph(a, edges) {
    const graph = {};
    a.forEach((val, idx) => {
        graph[idx] = {
            value: val,
            edge: []
        };
    });
    edges.forEach((edge) => {
        const [u, v] = edge;
        graph[u].edge.push(v);
        graph[v].edge.push(u);
    });
    return graph;
}

function solution(a, edges) {
    let answer = 0n; // 정수뒤에 n을 붙이면 BigInt로 인식
    const graph = makeGraph(a, edges);
    const visited = new Array(a.length).fill(false);
    const stack = [[0, 0]];

    while (stack.length > 0) {
        const [cur, parent] = stack.pop();
        
        if (visited[cur]) { // 방문한 곳을 다시 방문하면 leaf 노드
            answer += BigInt(Math.abs(graph[cur].value));
            graph[parent].value += graph[cur].value;
            continue;
        }
        
        stack.push([cur, parent]);
        visited[cur] = true;

        graph[cur].edge.forEach(e => {
            if (!visited[e]) {
                stack.push([e, cur]);
            }
        })
    }
    return graph[0].value == 0 ? answer : -1;
}

