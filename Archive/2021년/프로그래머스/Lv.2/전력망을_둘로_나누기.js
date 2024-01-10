const INF = 9876543210;

function makeGraph (n, wires) {
    const graph = {};
    for (let i = 1; i <= n; i++) {
        graph[i] = [];
    }
    
    for (let i = 0; i < wires.length; i++) {
        const [s, e] = wires[i];
        graph[s].push(e);
        graph[e].push(s);
    }
    return graph;
}

function searchNodes (node, graph, visited, len) {
    visited[node] = true;
    
    for (let i = 0; i < graph[node].length; i++) {
        const nextNode = graph[node][i];
        if (!visited[nextNode]) {
            len[0] += 1;
            searchNodes(nextNode, graph, visited, len);
        }
    }
}

function getGroupDiff (n, graph) {
    let diff = INF;
    const visited = Array.from({ length: n }, () => false);
    const group = [];
    for (let node = 1; node <= n; node++) {
        let len = [0];
        if (!visited[node]) {
            searchNodes(node, graph, visited, len);
        }
        if (len[0] > 0) {
            const aGroup = len[0] + 1;
            const bGroup = n - (len[0] + 1);
            diff = Math.abs(aGroup - bGroup);
        }
    }
    return diff;
}

function solution(n, wires) {
    let answer = INF;
    
    for (let i = 0; i < wires.length; i++) {
        const nextWires = wires.slice();
        nextWires.splice(i, 1);
        const graph = makeGraph(n, nextWires);
        const diff = getGroupDiff(n, graph);
        if (answer > diff) {
            answer = diff;
        }
    }
    return answer;
}
