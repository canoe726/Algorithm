class Node:
    def __init__(self, data):
        self.data = data
        self.next = None


class Stack:
    def __init__(self):
        self.top = None

    def push(self, data):
        new_node = Node(data)
        new_node.next = self.top
        self.top = new_node

    def pop(self):
        if self.empty():
            return None

        pop_data = self.top.data
        self.top = self.top.next

        return pop_data

    def empty(self):
        return self.top == None

    def peek(self):
        if self.empty():
            return None
        return self.top.data


class MinStack(Stack):
    def __init__(self):
        super().__init__()
        self.min = Stack()

    def push(self, data):
        super().push(data)

        if self.min.empty():
            self.min.push(data)
            return

        if self.min.peek() > data:
            self.min.push(data)

    def pop(self):
        pop_data = super().pop()

        peek = self.min.peek()
        if peek >= pop_data:
            self.min.pop()

        return pop_data

    def get_min(self):
        return self.min.peek()


if __name__ == "__main__":
    stack = MinStack()
    stack.push(7)
    print(stack.peek(), stack.get_min())

    stack.push(2)
    print(stack.peek(), stack.get_min())

    stack.push(1)
    print(stack.peek(), stack.get_min())

    stack.push(3)
    print(stack.peek(), stack.get_min())

    stack.push(6)
    print(stack.peek(), stack.get_min())
    print()

    print(stack.pop())
    print(stack.peek(), stack.get_min())
    print()

    print(stack.pop())
    print(stack.peek(), stack.get_min())
    print()

    print(stack.pop())
    print(stack.peek(), stack.get_min())
    print()

    print(stack.pop())
    print(stack.peek(), stack.get_min())
    print()

    print(stack.pop())
    print(stack.peek(), stack.get_min())
    print()
