class Node:
    def __init__(self, data):
        self.data = data
        self.next = None


class LinkedList:
    def __init__(self):
        self.head = None
        self.length = 0

    def append(self, data):
        new_node = Node(data)

        if self.head == None:
            self.head = new_node
            return

        node = self.head
        while node.next:
            node = node.next
        node.next = new_node

    def appendNode(self, new_node):
        if self.head == None:
            self.head = new_node
            return

        node = self.head
        while node.next:
            node = node.next
        node.next = new_node


def getCircularNode(list):
    slow = list.head
    fast = list.head

    while fast and fast.next:
        slow = slow.next
        fast = fast.next.next
        if slow == fast:
            break

    if not fast or not fast.next:
        return None

    slow = list.head
    while slow != fast:
        slow = slow.next
        fast = fast.next

    return fast


if __name__ == "__main__":
    circular_node = Node("D")

    circularLinkedList = LinkedList()
    circularLinkedList.append("A")
    circularLinkedList.append("B")
    circularLinkedList.append("C")
    circularLinkedList.appendNode(circular_node)
    circularLinkedList.append("E")
    circularLinkedList.append("F")
    circularLinkedList.append("G")
    circularLinkedList.append("H")
    circularLinkedList.append("I")
    circularLinkedList.append("J")
    circularLinkedList.append("K")
    circularLinkedList.appendNode(circular_node)

    node = getCircularNode(circularLinkedList)
    print(node.data)

    # node = circularLinkedList.head
    # idx = 0
    # while idx < 10 and node:
    #     print(node.data)
    #     node = node.next
    #     idx += 1
