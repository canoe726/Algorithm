function makeTree (rootNode, curNode, tree, inputNode, dir) {
    const [ix, iy, iNode] = inputNode;
    if (curNode == null) {
        if (dir == 0) {
            tree[rootNode].left = iNode;
        } else {
            tree[rootNode].right = iNode;
        }
        tree[iNode] = {
            ...tree[iNode],
            info: inputNode,
        }
        return;
    }
    const [cx, cy, cNode] = tree[curNode].info;
    if (cx > ix) { // left
        makeTree(cNode, tree[cNode].left, tree, inputNode, 0);
    } else if (cx < ix) { // right
        makeTree(cNode, tree[cNode].right, tree, inputNode, 1);
    }
}

function preOrder (rNode, tree) {
    const order = [];
    function search (curNode) {
        if (tree[curNode]) {
            order.push(curNode);
            search(tree[curNode].left);
            search(tree[curNode].right);
        }
    }
    search(rNode);
    return order;
}

function postOrder (rNode, tree) {
    const order = [];
    function search (curNode) {
        if (tree[curNode]) {
            search(tree[curNode].left);
            search(tree[curNode].right);
            order.push(curNode);
        }
    }
    search(rNode);
    return order;
}

function solution(nodeinfo) {
    let answer = [[]];
    nodeinfo = nodeinfo.map((item, idx) => {
        return [...item, idx + 1];
    });
    nodeinfo.sort((a, b) => { // x, y
        if (a[0] == b[0]) {
            return a[0] - b[0];
        } else {
            return b[1] - a[1];
        }
    });
    nodeinfo.reverse();
    const tree = {};
    for (let i = 0; i < nodeinfo.length; i++) {
        tree[i] = {
            info: null,
            left: null,
            right: null,
        }
    }
    const [rx, ry, rNode] = nodeinfo.pop();
    tree[rNode] = {
        info: [rx, ry, rNode], // x, y, node
        left: null,
        right: null,
    };
    while (nodeinfo.length > 0) {
        makeTree(rNode, rNode, tree, nodeinfo.pop(), -1);
    }
    const order1 = preOrder(rNode, tree);
    const order2 = postOrder(rNode, tree);
    return [order1, order2];
}
