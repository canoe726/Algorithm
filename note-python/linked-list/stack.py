class Node:
    def __init__(self, data):
        self.next = None
        self.data = data


class Stack:
    def __init__(self):
        self.head = None
        self.length = 0

    def is_empty(self):
        return self.length == 0

    def top(self):
        return self.head.data

    def push(self, data):
        node = Node(data)

        node.next = self.head
        self.head = node
        self.length += 1

    def pop(self):
        node = self.head
        if node == None:
            return None

        if self.length == 1:
            data = node.data
            self.head = None
            self.length -= 1

            return data

        self.head = self.head.next
        self.length -= 1

        return node.data


if __name__ == "__main__":
    stack = Stack()
    stack.push(2)
    stack.push(3)
    stack.push(1)
    stack.push(4)

    print("top: ", stack.top())
    print("pop: ", stack.pop())

    print("top: ", stack.top())
    print("pop: ", stack.pop())

    print("top: ", stack.top())
    print("pop: ", stack.pop())

    print(stack.is_empty())
