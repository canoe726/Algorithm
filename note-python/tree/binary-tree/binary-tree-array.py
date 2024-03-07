class BinaryTree:
    def __init__(self, tree):
        self.index = 0
        self.tree = tree
        self.length = len(tree)

    def __len__(self):
        return self.length

    def __str__(self):
        if self.length == 0:
            return ""

        result = "["
        for index in range(self.length - 1):
            result += str(self.tree[index]) + ", "
        result += str(self.tree[index + 1]) + "]"

        return result

    def find_node(self, key):
        root = 0
        size = self.length

        if self.tree[0] != key:
            while root < size:
                left = (root * 2) + 1
                right = left + 1

                if self.tree[root] == key:
                    break
                if left >= size:
                    root = -1
                    break

                if key > self.tree[left]:
                    root = right
                if key < self.tree[right]:
                    root = left

        if root == -1:
            left_child = -1
        else:
            left_child = root * 2 + 1
            left_child = left_child if left_child < size else -1

        if left_child == -1:
            right_child = -1
        else:
            right_child = left_child + 1
            right_child = right_child if right_child < size else -1

        return [
            (root, self.tree[root]),
            (left_child, self.tree[left_child] if left_child >= 0 else -1),
            (right_child, self.tree[right_child] if right_child >= 0 else -1),
        ]

    def find_parent(self, key):
        root, _, _ = self.find_node(key)
        root_key = root[0]

        if root_key <= 0:
            return None
        else:
            return (root_key - 1) // 2

    def pre_order(self, index=0):
        result = []

        def _pre_order(index):
            if index < self.length:
                left = index * 2 + 1
                right = left + 1

                result.append(self.tree[index])
                _pre_order(left)
                _pre_order(right)

        _pre_order(index)
        return result

    def pre_order_stack(self, index=0):
        if self.length == 0:
            return []

        size = self.length
        result, stack = [], [index]

        while stack:
            root = stack.pop()
            left = root * 2 + 1
            right = left + 1

            result.append(self.tree[root])

            if right < size:
                stack.append(right)
            if left < size:
                stack.append(left)

        return result

    def in_order(self, index=0):
        result = []

        def _in_order(index):
            if index < self.length:
                left = index * 2 + 1
                right = left + 1

                _in_order(left)
                result.append(self.tree[index])
                _in_order(right)

        _in_order(index)
        return result

    def in_order_stack(self, i=0):
        if self.length == 0:
            return []

        index = i
        size = self.length
        result, stack = [], []

        while True:
            if index < size:
                stack.append(index)
                index = index * 2 + 1
            elif stack:
                index = stack.pop()
                result.append(self.tree[index])
                index = index * 2 + 2
            else:
                break

        return result

    def post_order(self, index=0):
        result = []

        def _post_order(index):
            if index < self.length:
                left = index * 2 + 1
                right = left + 1

                _post_order(left)
                _post_order(right)
                result.append(self.tree[index])

        _post_order(index)
        return result

    def post_order_stack(self, index=0):
        if self.length == 0:
            return []

        size = self.length
        result, stack, visit = [], [index], []

        while stack:
            index = stack.pop()
            visit.append(index)

            left = index * 2 + 1
            right = left + 1

            if left < size:
                stack.append(left)
            if right < size:
                stack.append(right)

        for _ in range(len(visit)):
            result.append(self.tree[visit.pop()])

        return result


binaryTree = BinaryTree([50, 30, 70, 1, 35, 60, 80])
print("binaryTree : ", binaryTree)
print("tree size : ", len(binaryTree))
print()

find_node_queries = [70, 50, 1, 35, 5000]
for query in find_node_queries:
    print(
        "find_node ["
        + str(query)
        + "] (P, LN, RN) -> "
        + str(binaryTree.find_node(query))
    )
print()

find_parent_queries = [70, 80, 50, 8000]
for query in find_parent_queries:
    print("find_parent [" + str(query) + "] -> " + str(binaryTree.find_parent(query)))
print()

print("pre_order : " + str(binaryTree.pre_order()))
print("pre_order_stack : " + str(binaryTree.pre_order_stack()))
print()

print("in_order : " + str(binaryTree.in_order()))
print("in_order_stack : " + str(binaryTree.in_order_stack()))
print()

print("post_order : " + str(binaryTree.post_order()))
print("post_order_stack : " + str(binaryTree.post_order_stack()))
print()
