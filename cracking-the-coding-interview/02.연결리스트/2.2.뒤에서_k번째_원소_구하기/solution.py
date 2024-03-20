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
        self.length += 1

        if self.head == None:
            self.head = new_node
            return

        node = self.head
        while node.next:
            node = node.next
        node.next = new_node

    # 길이를 아는 경우
    def get_last_1(self, k):
        if self.length < k:
            return None

        count = self.length - k
        node = self.head
        while count > 0 and node.next:
            node = node.next
            count -= 1
        return node.data

    # 길이를 모르는 경우
    def get_last_2(self, k):
        # [0]: size, [1]: value
        result = [0, None]

        def find(head, step, k, result):
            if head:
                find(head.next, step + 1, k, result)

                if result[0] - k == step:
                    result[1] = head.data
                    return
            else:
                result[0] = step

        node = self.head
        find(node, 0, k, result)

        return result[1]

    def get_last_3(self, k):
        node = self.head
        count = 1

        while count < k and node.next:
            node = node.next
            count += 1

        if count < k:
            return None

        result = self.head
        while node.next:
            result = result.next
            node = node.next

        return result.data


if __name__ == "__main__":
    linked_list = LinkedList()

    adds = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
    for add in adds:
        linked_list.append(add)

    k = 4
    print(linked_list.get_last_1(k))
    print(linked_list.get_last_2(k))
    print(linked_list.get_last_3(k))
