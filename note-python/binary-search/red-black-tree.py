class Node:
    def __init__(self, data):
        self.data = data
        self.parent = None
        self.left = None
        self.right = None
        self.color = 0  # 0 = black, 1 = red


class RedBlackTree:
    def __init__(self):
        self.head = None

    def grandparent(self, node):
        if node != None and node.parent != None:
            return node.parent.parent
        return None

    def uncle(self, node):
        g = self.grandparent(node)
        if not g:
            return None
        else:
            if g.left == node.parent:
                return g.right
            else:
                return g.left

    def insert(self, data):
        new_node = Node(data)
        pass
