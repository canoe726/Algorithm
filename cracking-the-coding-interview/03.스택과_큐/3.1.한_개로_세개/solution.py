class FixedMultiStack:
    def __init__(self, stack_size):
        self.numOfStacks = 3
        self.stackCapacity = stack_size
        self.values = [None] * self.stackCapacity * self.numOfStacks
        self.sizes = [0] * self.numOfStacks

    def push(self, stack_num, data):
        if self.is_full(stack_num):
            print("Stack capacity is already fulled")
            return

        next_index = self.index_of_top(stack_num) + 1
        self.values[next_index] = data
        self.sizes[stack_num] += 1

    def pop(self, stack_num):
        if self.is_empty(stack_num):
            print("Stack is already empty")
            return None

        top = self.index_of_top(stack_num)
        pop_data = self.values[top]
        self.values[top] = None
        self.sizes[stack_num] -= 1

        return pop_data

    def peek(self, stack_num):
        size = self.sizes[stack_num]
        if size == 0:
            print("No element in (" + str(stack_num) + ") stack")
            return

        top = self.index_of_top(stack_num)
        return self.values[top]

    def is_full(self, stack_num):
        return self.sizes[stack_num] == self.stackCapacity

    def is_empty(self, stack_num):
        return self.sizes[stack_num] == 0

    def index_of_top(self, stack_num):
        size = self.sizes[stack_num]
        offset = stack_num * self.stackCapacity + size
        return offset - 1


stack = FixedMultiStack(3)
stack.push(0, 1)
stack.push(0, 2)
stack.push(0, 3)
stack.push(0, 4)
print(stack.values, stack.sizes)

print(stack.peek(0))
stack.pop(0)
print(stack.peek(0))
stack.pop(0)
print(stack.peek(0))
stack.pop(0)
stack.pop(0)

print(stack.values, stack.sizes)
