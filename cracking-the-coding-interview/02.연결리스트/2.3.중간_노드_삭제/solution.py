class Node:
    def __init__(self, data):
        self.data = data
        self.next = None


class LinkedList:
    def __init__(self):
        self.head = None

    def __str__(self):
        result = "["

        node = self.head
        while node and node.next:
            result += str(node.data) + ", "
            node = node.next

        if node:
            result += str(node.data) + "]"
        else:
            result += "]"

        return result

    def append(self, data):
        new_node = Node(data)

        if self.head == None:
            self.head = new_node
            return

        node = self.head
        while node.next:
            node = node.next
        node.next = new_node

    def remove_mid_1(self):
        if self.head == None:
            return None
        if self.head.next == None:
            removed_data = self.head.data
            self.head = None
            return removed_data

        prev = None
        slow = self.head
        fast = self.head

        while fast.next and fast.next.next:
            prev = slow
            slow = slow.next
            fast = fast.next.next

        removed_data = slow.data
        if prev:
            prev.next = slow.next
        else:
            self.head = slow.next
        return removed_data

    # 마지막 노드는 처리 불가
    def remove_mid(self, head):
        if head == None or head.next == None:
            return False

        next = head.next
        head.data = next.data
        head.next = next.next

        return True


if __name__ == "__main__":
    linked_list = LinkedList()

    adds = [1, 2, 3, 4, 5]
    for add in adds:
        linked_list.append(add)
    linked_list.remove_mid(linked_list.head.next.next)
    print("removed: ", linked_list)
