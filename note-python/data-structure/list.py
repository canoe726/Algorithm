class Node:
    def __init__(self, data):
        self.data = data
        self.next = None


class List:
    def __init__(self):
        self.head = None
        self.length = 0

    def __len__(self):
        return self.length

    def __str__(self):
        if self.length == 0:
            return ""
        if self.length == 1:
            return "[" + self.head.data + "]"

        result = "["
        node = self.head
        while node.next:
            result += str(node.data) + ", "
            node = node.next
        result += str(node.data) + "]"

        return result

    def append(self, data):
        new_node = Node(data)
        self.length += 1
        if self.head == None:
            self.head = new_node
            return None

        node = self.head
        while node.next:
            node = node.next
        node.next = new_node

    def insert(self, index, data):
        if index < 0:
            index = self.length + index
            if index < 0:
                index = 0

        new_node = Node(data)
        self.length += 1

        if index == 0:
            new_node.next = self.head
            self.head = new_node
            return

        step = 0
        node = self.head
        while step < index - 1 and node.next:
            node = node.next
            step += 1

        if node.next == None:
            node.next = new_node
        else:
            new_node.next = node.next
            node.next = new_node

    def pop(self):
        if self.head == None:
            return "Empty"

        self.length -= 1
        node = self.head

        if node.next == None:
            self.head = None
            return 0

        index = 1
        while node.next.next:
            index += 1
            node = node.next
        node.next = None

        return index

    def remove(self, value):
        if self.head == None:
            return "Empty"

        self.length -= 1
        node = self.head

        if node.data == value:
            self.head = self.head.next
            return

        prev = None
        while node.next:
            if node.data == value:
                break

            prev = node
            node = node.next

        prev.next = node.next

    def prints(self, node):
        result = "["

        while node.next:
            result += str(node.data) + ", "
            node = node.next
        result += "]"

        print("prints: ", result)

    def reverse(self):
        if self.head == None or self.head.next == None:
            return

        prev = None
        ahead = self.head.next

        while ahead:
            self.head.next = prev
            prev = self.head
            self.head = ahead
            ahead = ahead.next

        self.head.next = prev

    def _get_mid(self, head):
        if head == None:
            return head

        slow = head
        fast = head

        while fast.next and fast.next.next:
            slow = slow.next
            fast = fast.next.next
        return slow

    def merge(self, left, right):
        result = None

        if left == None:
            return right
        if right == None:
            return left

        if left.data <= right.data:
            result = left
            result.next = self.merge(left.next, right)
        else:
            result = right
            result.next = self.merge(left, right.next)
        return result

    def merge_sort(self, head):
        if head == None or head.next == None:
            return head

        mid = self._get_mid(head)
        print("mid: ", mid.data)
        next_middle = mid.next
        mid.next = None

        left = self.merge_sort(head)
        right = self.merge_sort(next_middle)

        sorted_list = self.merge(left, right)

        print("left")
        self.prints(left)
        print()
        print("right")
        self.prints(right)
        print()
        print("sorted_list")
        self.prints(sorted_list)
        print()
        return sorted_list

    def sort(self):
        return self.merge_sort(self.head)


my_list = List()
my_list.append(1)
my_list.append(3)
my_list.append(4)
my_list.insert(0, 2)
my_list.insert(-100, 6)
my_list.insert(100, 5)
print("pop: ", my_list.pop())
my_list.remove(6)
my_list.append(8)
# my_list.reverse()
my_list.sort()

print("my_list : ", my_list)
print("my_list length : ", len(my_list))


a = [1, 3, 4]
a.insert(0, 2)
a.insert(-100, 6)
a.insert(100, 5)
a.pop()
a.remove(6)
a.append(8)
# a.reverse()
a.sort()
print(a)
print(len(a))
