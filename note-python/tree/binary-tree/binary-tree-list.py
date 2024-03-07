class Node:
    def __init__(self, data):
        self.data = data
        self.left = None
        self.right = None


class BinaryTree:
    def __init__(self):
        self.root = None


if __name__ == "__main__":
    nodes = [50, 30, 70, 1, 35, 60, 80]

    binaryTree = BinaryTree()
    binaryTree.root = Node()
