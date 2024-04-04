class Node:
    def __init__(self, data, min=None):
        self.data = data
        self.next = None
        self.min = min


class Stack:
    def __init__(self):
        self.top = None

    def push(self, data):
        new_node = Node(data)

        top = self.peek()
        if top:
            _, top_min = top
            new_node.min = min(data, top_min)
        else:
            new_node.min = data

        new_node.next = self.top
        self.top = new_node

    def pop(self):
        if self.top == None:
            return None

        pop_data = self.top.data
        self.top = self.top.next

        return pop_data

    def peek(self):
        if self.top:
            return [self.top.data, self.top.min]
        else:
            return None

    def min(self):
        _, min = self.peek()
        return min

    def empty(self):
        return self.top == None


if __name__ == "__main__":
    stack = Stack()
    stack.push(4)
    stack.push(3)
    stack.push(5)
    stack.push(7)
    stack.push(1)

    print(stack.peek(), stack.min())
    print(stack.pop())
    print()

    print(stack.peek(), stack.min())
    print(stack.pop())
    print()

    print(stack.peek(), stack.min())
    print(stack.pop())
    print()

    print(stack.peek(), stack.min())
    print(stack.pop())
    print()

    print(stack.peek(), stack.min())
    print(stack.pop())
    print()
