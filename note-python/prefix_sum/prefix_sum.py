n = 5
data = [10, 20, 30, 40, 50]


def calc_prefix_sum(data, size):
    prefix_sum = [0]
    sum_value = 0

    for i in range(size):
        sum_value += data[i]
        prefix_sum.append(sum_value)

    return prefix_sum


def get_prefix_sum(prefix_sum, start, end):
    return prefix_sum[end] - prefix_sum[start - 1]


prefix_sum = calc_prefix_sum(data, n)
print(get_prefix_sum(prefix_sum, 1, 5))
print(get_prefix_sum(prefix_sum, 2, 2))
print(get_prefix_sum(prefix_sum, 3, 5))
