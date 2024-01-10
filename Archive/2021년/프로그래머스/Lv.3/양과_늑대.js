function makeTree (info, edges) {
    const size = info.length;
    let tree = {};
    for (let i = 0; i < size; i++) {
        tree[i] = [];
    }
    
    edges.forEach(edge => {
        const [s, e] = edge;
        tree[s].push(e);
    });
    return tree;
}

function searchTree (tree, info) {
    let value = 1;
    function dfs (nodes, idx, sheep, wolf) {
        let nextNodes = nodes.slice();
        const curNode = nextNodes[idx];
        nextNodes.splice(idx, 1);
        nextNodes = nextNodes.concat(tree[curNode]);
        
        const nextSheep = info[curNode] == 0 ? sheep + 1 : sheep;
        const nextWolf = info[curNode] == 1 ? wolf + 1 : wolf;
        if (nextSheep > value) {
            value = nextSheep;
        }
        for (let i = 0; i < nextNodes.length; i++) {
            if (nextSheep <= nextWolf) {
                continue;
            }
            dfs(nextNodes, i, nextSheep, nextWolf);
        }
    }
    dfs([0], 0, 0, 0, 0);
    return value;
}

function solution(info, edges) {
    const tree = makeTree(info, edges);
    const answer = searchTree(tree, info);
    return answer;
}
