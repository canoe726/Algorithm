class Node:
    def __init__(self, data):
        self.data = data
        self.next = None


class LinkedList:
    def __init__(self):
        self.head = None
        self.length = 0

    def __str__(self):
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
            return

        node = self.head
        while node.next:
            node = node.next
        node.next = new_node

    def unique(self):
        if self.length == 1:
            return

        hash = {}
        prev = None
        node = self.head
        while node:
            if node.data in hash:
                prev.next = node.next
            else:
                hash[node.data] = True
            prev = node
            node = node.next

    def unique_no_hash(self):
        if self.length == 1:
            return

        base = self.head

        while base:
            prev = base
            node = base.next
            while node:
                if base.data == node.data:
                    prev.next = node.next
                prev = node
                node = node.next

            base = base.next


if __name__ == "__main__":
    linked_list = LinkedList()
    linked_list.append(2)
    linked_list.append(8)
    linked_list.append(1)
    linked_list.append(3)
    linked_list.append(11)
    linked_list.append(2)
    linked_list.append(6)
    linked_list.append(1)

    print("before :", linked_list)
    # linked_list.unique()
    linked_list.unique_no_hash()
    print("unique: ", linked_list)
