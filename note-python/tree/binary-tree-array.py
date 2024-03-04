# 레벨 순서
class BinaryTree:
    def __init__(self):
        self.index = 0
        self.tree = []
        self.length = 0

    def __len__(self):
        return self.length

    def push(self, node):
        root = 0
        size = len(self.tree)

        if size == 0:
            self.tree.append(node)
            return

        while root < size - 1:
            left = (root * 2) + 1
            right = (root * 2) + 2

            if self.tree[left] > node:
                root = left
            elif self.tree[right] < node:
                root = right

        self.length += 1

    def find_node(self, key):
        root = 0
        size = len(self.tree)

        if self.tree[0] == key:
            return root

        while root < size - 1:
            left = (root * 2) + 1
            right = (root * 2) + 2

            if left < size and self.tree[left] < root:
                root = left
            elif right < size and self.tree[right] > root:
                root = right

            if self.tree[left] == key:
                return left
            if self.tree[right] == key:
                return right

        return None


binaryTree = BinaryTree()

nodes = [50, 30, 70, 1, 35, 60, 80]
for node in nodes:
    binaryTree.push(node)

print(len(binaryTree))
print(binaryTree.find_node(70))
print(binaryTree.find_node(30))
print(binaryTree.find_node(120))

# print(binaryTree.push("A"))
