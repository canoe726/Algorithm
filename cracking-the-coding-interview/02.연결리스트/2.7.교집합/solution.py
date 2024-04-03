class Node:
    def __init__(self, data):
        self.data = data
        self.next = None


class LinkedList:
    def __init__(self):
        self.head = None

    def append(self, data):
        new_node = Node(data)

        if self.head == None:
            self.head = new_node
            return

        node = self.head
        while node.next:
            node = node.next
        node.next = new_node

    def appendData(self, data):
        if self.head == None:
            self.head = data
            return

        node = self.head
        while node.next:
            node = node.next
        node.next = data


def getListSize(list):
    size = 0

    node = list
    while node.next:
        size += 1
        node = node.next
    return size


def isIntersection(list1, list2):
    common_node = None
    node1 = list1
    node2 = list2

    while node1.next and node2.next:
        if node1 == node2 and common_node == None:
            common_node = node1

        node1 = node1.next
        node2 = node2.next

    if node1 == node2:
        return common_node

    return False


if __name__ == "__main__":
    commonList = Node(3)
    commonList.next = Node(1)
    commonList.next.next = Node(2)

    linkedList1 = LinkedList()
    linkedList2 = LinkedList()

    linkedList1.append(1)
    linkedList1.append(5)
    linkedList1.appendData(commonList)

    linkedList2.append(2)
    linkedList2.append(5)
    linkedList2.append(4)
    linkedList2.append(7)
    linkedList2.appendData(commonList)

    node = linkedList1.head
    while node:
        print(node)
        node = node.next

    print()
    node = linkedList2.head
    while node:
        print(node)
        node = node.next
    print()

    list1_size = getListSize(linkedList1.head)
    list2_size = getListSize(linkedList2.head)

    list1 = linkedList1.head
    list2 = linkedList2.head

    if list1_size != list2_size:
        index = 0
        gap = abs(list1_size - list2_size)

        if list1_size > list2_size:
            while index < gap:
                list1 = list1.next
                index += 1
        else:
            while index < gap:
                list2 = list2.next
                index += 1

    common_node = isIntersection(list1, list2)
    if common_node:
        print(common_node.data)
    else:
        print("two nodes are different")
