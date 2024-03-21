class Node:
    def __init__(self, data):
        self.data = data
        self.next = None


class LinkedList:
    def __init__(self):
        self.head = None
        self.length = 0

    def __str__(self):
        result = ""
        if self.head == None:
            return result
        if self.head.next == None:
            return self.head.data

        node = self.head
        while node.next:
            result += str(node.data) + "->"
            node = node.next
        result += str(node.data)

        return result

    def append(self, data):
        new_node = Node(data)
        self.length += 1

        if self.head == None:
            self.head = new_node
            return

        node = self.head
        while node.next:
            node = node.next
        node.next = new_node

    def divide_1(self, x):
        if self.head == None or self.head.next == None:
            return

        small_list = Node(-1)
        small_temp = small_list
        prev = None
        node = self.head

        while node:
            if x > node.data:
                small_temp.next = Node(node.data)
                small_temp = small_temp.next

                if node == self.head:
                    self.head = self.head.next
                else:
                    prev.next = node.next
            if node and x <= node.data:
                prev = node
            node = node.next

        small_list = small_list.next
        small_temp.next = self.head
        self.head = small_list

    def divide_2(self, x):
        if self.head == None or self.head.next == None:
            return

        def search(prev, cur):
            if not cur:
                return
            search(cur, cur.next)

            if x > cur.data and prev:
                prev.next = cur.next
                node = self.head
                cur.next = node
                self.head = cur

        search(None, self.head)


if __name__ == "__main__":
    linked_list = LinkedList()
    adds = [10, 3, 3, 5, 8, 5, 10, 2, 1]

    for add in adds:
        linked_list.append(add)

    x = 5
    linked_list.divide_2(5)
    print(linked_list)
