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
            return ""
        if self.head.next == None:
            return "[" + str(self.head.data) + "]"

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

    def get_num_1(self):
        result = [0]

        def search(head, p, result):
            if not head:
                return
            search(head.next, p + 1, result)
            result[0] += pow(10, p) * head.data

        search(self.head, 0, result)
        return result[0]

    def get_len(self, head):
        count = 0
        node = head
        while node:
            count += 1
            node = node.next
        return count

    def desc_sort_numbers(self, a, b):
        num1 = a.head
        num2 = b.head
        num1_count = self.get_len(num1)  # 항상 1이 더 크거나 같음
        num2_count = self.get_len(num2)

        if num1_count < num2_count:
            num1 = b.head
            num2 = a.head

        return [num1, num2]

    def get_num_2(self, a, b):
        num1, num2 = self.desc_sort_numbers(a, b)
        num1_count = self.get_len(num1)  # 항상 1이 더 크거나 같음
        num2_count = self.get_len(num2)

        sum_list = Node(-1)
        temp = sum_list

        carry = 0
        while num1 and num2:
            sum_value = carry
            if carry > 0:
                carry -= 1

            sum_value += num1.data + num2.data
            if sum_value >= 10:
                carry += 1

            new_node = Node(sum_value % 10)
            temp.next = new_node
            temp = temp.next

            num1 = num1.next
            num2 = num2.next

        if num1_count == num2_count and carry > 0:
            new_node = Node(1)
            temp.next = new_node
        else:
            while num1:
                sum_value = carry
                if carry > 0:
                    carry -= 1

                sum_value += num1.data
                if sum_value >= 10:
                    carry += 1

                new_node = Node(sum_value % 10)
                temp.next = new_node
                temp = temp.next

                num1 = num1.next

        self.head = sum_list.next


def addLists(l1, l2, carry):
    if not l1 and not l2 and carry == 0:
        return None

    result = Node(None)
    value = carry
    if l1:
        value += l1.data
    if l2:
        value += l2.data

    result.data = value % 10

    if l1 or l2:
        next_l1 = l1.next if l1 else None
        next_l2 = l2.next if l2 else None
        next_carry = 1 if value >= 10 else 0

        more = addLists(next_l1, next_l2, next_carry)
        result.next = more
    return result


class PartialSum:
    def __init__(self):
        self.sum = Node(None)
        self.carry = 0


def insertBefore(list, data):
    node = Node(data)
    if list:
        node.next = list
    return node


def padList(l, padding):
    head = l
    for i in range(padding):
        head = insertBefore(head, 0)
    return head


def addListsHelper(l1, l2):
    if not l1 and not l2:
        sum = PartialSum()
        return sum

    sum = addListsHelper(l1.next, l2.next)
    val = sum.carry + l1.data + l2.data

    full_result = insertBefore(sum.sum, val % 10)
    sum.sum = full_result
    sum.carry = val / 10
    return sum


def addLists2(l1, l2):
    len1 = len(l1)
    len2 = len(l2)

    if len1 < len2:
        l1 = padList(l1, len2 - len1)
    else:
        l2 = padList(l2, len1 - len2)

    sum = addListsHelper(l1, l2)
    if sum.carry == 0:
        return sum.sum
    else:
        result = insertBefore(sum.sum, sum.carry)
        return result


if __name__ == "__main__":
    num1 = LinkedList()
    num2 = LinkedList()

    num1_adds = [7, 1, 6, 2]
    num2_adds = [5, 9, 3]

    for add in num1_adds:
        num1.append(add)
    for add in num2_adds:
        num2.append(add)

    sum_list = addLists(num1.head, num2.head, 0)
    temp = sum_list
    while temp:
        print(str(temp.data) + " -> ", end="")
        temp = temp.next
    print()

    # sum_list = LinkedList()
    # sum_list.get_num_2(num1, num2)
    # print(sum_list)

    # total = num1.get_num_1() + num2.get_num_1()
    # sum_adds = []
    # while total:
    #     sum_adds.append(total % 10)
    #     total //= 10
    # sum_list = LinkedList()
    # for add in sum_adds:
    #     sum_list.append(add)
    # print(sum_list)
