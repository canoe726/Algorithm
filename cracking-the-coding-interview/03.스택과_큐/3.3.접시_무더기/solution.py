class Node:
    def __init__(self, data):
        self.next = None
        self.data = data


class Stack:
    def __init__(self):
        self.top = None
        self.size = 0

    def push(self, data):
        new_node = Node(data)

        new_node.next = self.top
        self.top = new_node
        self.size += 1

    def pop(self):
        if self.empty():
            return None

        top = self.top
        self.top = self.top.next
        self.size -= 1

        return top.data

    def get_size(self):
        return self.size

    def empty(self):
        return self.top == None

    def peek(self):
        if self.empty():
            return None
        return self.top.data


class StackSet:
    def __init__(self, size):
        self.stacks = []
        self.size = size

    def push(self, data):
        if len(self.stacks) == 0:
            self.stacks.append(Stack())

        stack = self.stacks[len(self.stacks) - 1]

        if stack.get_size() >= self.size:
            self.stacks.append(Stack())
            stack = self.stacks[len(self.stacks) - 1]

        stack.push(data)

    def pop(self):
        if self.empty():
            return None

        top = self.stacks[len(self.stacks) - 1]
        pop_data = top.pop()

        if top.empty():
            self.stacks.pop()

        return pop_data

    def peek(self):
        if self.empty():
            return None
        return self.stacks[len(self.stacks) - 1].peek()

    def empty(self):
        return len(self.stacks) == 0


if __name__ == "__main__":
    stack_set = StackSet(3)
    stack_set.push(1)
    stack_set.push(2)
    stack_set.push(3)
    stack_set.push(4)
    stack_set.push(5)
    # stack_set.push(6)
    print(stack_set.pop())
    print(stack_set.pop())
    print(stack_set.pop())
    # stack_set.pop()
    # stack_set.pop()
    # stack_set.pop()
    # stack_set.pop()
    print(stack_set.peek())
