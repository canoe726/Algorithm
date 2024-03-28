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
            return None
        if self.head.next == None:
            return self.head.data

        result = ""
        node = self.head
        while node.next:
            result += str(node.data) + ", "
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

    def reverse(self):
        if self.head == None:
            return
        if self.head.next == None:
            return

        prev = None
        ahead = self.head.next
        while ahead:
            self.head.next = prev
            prev = self.head
            self.head = ahead
            ahead = ahead.next
        self.head.next = prev

    def clone(self):
        new_list = LinkedList()
        node = self.head

        while node:
            new_list.append(node.data)
            node = node.next
        return new_list


def isPalindrome(list):
    reversed = linkedList.clone()
    reversed.reverse()

    temp1 = list.head
    temp2 = reversed.head

    while temp1 and temp2:
        if temp1.data != temp2.data:
            return False
        temp1 = temp1.next
        temp2 = temp2.next
    return True


def get_mid(list):
    stack = []
    fast = list.head
    slow = list.head

    while fast and fast.next:
        stack.append(slow.data)
        slow = slow.next
        fast = fast.next.next

    if fast:
        slow = slow.next

    return [slow, stack]


def isPalindrome1(list):
    stack = []

    slow, stack = get_mid(list)

    while stack:
        pop_data = stack.pop()
        if pop_data != slow.data:
            return False
        slow = slow.next

    return True


if __name__ == "__main__":
    linkedList = LinkedList()

    adds = ["a", "b", "b", "a"]
    for add in adds:
        linkedList.append(add)

    print("isPalindrome: ", isPalindrome(linkedList))
    print("isPalindrome: ", isPalindrome1(linkedList))
