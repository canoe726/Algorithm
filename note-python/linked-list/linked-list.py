class Node:
    def __init__(self, data):
        self.data = data
        self.next = None


class LinkedList:
    def __init__(self):
        self.head = None
        self.length = 0

    def __len__(self):
        return self.length

    def __str__(self):
        if self.head == None:
            return "Empty"
        result = "["
        node = self.head
        while node.next != None:
            result += str(node.data) + ", "
            node = node.next
        result += str(node.data) + "]"

        return result

    def __contains__(self, target):
        node = self.head

        while node:
            if node.data == target:
                return True
            node = node.next
        return False

    def appendleft(self, data):
        if self.head is None:
            self.head = Node(data)
        else:
            node = Node(data)
            node.next = self.head
            self.head = node
        self.length += 1

    def append(self, data):
        if self.head is None:
            self.head = Node(data)
        else:
            node = self.head
            while node:
                if node.next == None:
                    node.next = Node(data)
                    break
                node = node.next

        self.length += 1

    def popleft(self):
        if self.head == None:
            return self.head

        node = self.head
        value = node.data
        node = None
        self.head = self.head.next
        self.length -= 1

        return value

    def pop(self):
        if self.head == None:
            return None

        node = self.head
        while node.next:
            prev = node
            node = node.next

        if node == self.head:
            self.head = None
        else:
            prev.next = None

        self.length -= 1
        return node.data

    def remove(self, target):
        node = self.head
        while node and node.data != target:
            prev = node
            node = node.next

        if node == None:
            return False
        if node == self.head:
            self.head = self.head.next
        else:
            prev.next = node.next
        self.length -= 1

        return True

    def insert(self, index, data):
        new_node = Node(data)
        node = self.head

        if index <= 0:
            new_node.next = self.head
            self.head = new_node
            self.length += 1
            return

        if index >= self.length:
            while node.next:
                node = node.next
            node.next = new_node
            self.length += 1
            return

        cur = 0
        node = self.head

        while cur != (index - 1) and node:
            node = node.next
            cur += 1

        new_node.next = node.next
        node.next = new_node
        self.length += 1

    def reverse(self):
        if self.length < 2:
            return

        prev = None
        ahead = self.head.next
        while ahead:
            self.head.next = prev
            prev = self.head
            self.head = ahead
            ahead = ahead.next
        self.head.next = prev


if __name__ == "__main__":
    linkedList = LinkedList()

    linkedList.appendleft(4)
    linkedList.appendleft(3)
    linkedList.appendleft(2)
    linkedList.appendleft(1)

    print("len : ", str(len(linkedList)))

    linkedList.append(5)
    linkedList.append(6)
    linkedList.append(7)
    linkedList.append(8)

    print(linkedList)

    linkedList.popleft()
    linkedList.popleft()
    linkedList.pop()

    print(linkedList)

    linkedList.remove(11)
    linkedList.remove(3)
    linkedList.remove(6)

    print(linkedList)

    linkedList.insert(-5, 3)
    linkedList.insert(100, 9)
    linkedList.insert(3, 6)

    print(linkedList)

    linkedList.reverse()

    print(linkedList)

    for i in range(-1, 3):
        print("[" + str(i) + "] ", i in linkedList)
