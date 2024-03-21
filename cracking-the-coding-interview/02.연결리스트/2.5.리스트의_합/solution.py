class Node:
    def __init__(self, data):
        self.data = data
        self.next = None


class LinkedList:
    def __init__(self):
        self.head = None

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


if __name__ == "__main__":
    num1 = LinkedList()
    num2 = LinkedList()

    num1_adds = [7, 1, 6]
    num2_adds = [5, 9, 3]

    for add in num1_adds:
        num1.append(add)
    for add in num2_adds:
        num2.append(add)

    sum_list = LinkedList()
    sum_list.get_num_2(num1, num2)
    print(sum_list)

    # total = num1.get_num_1() + num2.get_num_1()
    # sum_adds = []
    # while total:
    #     sum_adds.append(total % 10)
    #     total //= 10

    # sum_list = LinkedList()
    # for add in sum_adds:
    #     sum_list.append(add)

    # print(sum_list)
