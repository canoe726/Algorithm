from sys import stdin

answer = 0

N = list(map(int, stdin.readline().rstrip()))[0]
nums = list(map(int, stdin.readline().rstrip().split()))
counts = list(map(int, stdin.readline().rstrip().split()))

INF = 9999999999
min_answer = INF
max_answer = -INF

ops = {
    0: "+",
    1: "-",
    2: "*",
    3: "/",
}


def calc(nums, operators):
    result = nums[0]

    for o_idx in range(len(operators)):
        num = nums[o_idx + 1]
        operator = operators[o_idx]

        if operator == "+":
            result += num
        if operator == "-":
            result -= num
        if operator == "*":
            result *= num
        if operator == "/":
            if result > 0:
                result //= num
            else:
                temp = -result
                div = temp // num
                result = -div

    return result


def dfs(nums, counts, operators):
    global min_answer, max_answer

    if sum(counts) == 0:
        result = calc(nums, operators)
        min_answer = min(result, min_answer)
        max_answer = max(result, max_answer)
        return

    for i in range(4):
        if counts[i] > 0:
            counts[i] -= 1
            operators.append(ops[i])

            dfs(nums, counts, operators)

            counts[i] += 1
            operators.pop()


dfs(nums, counts, [])

print(max_answer)
print(min_answer)
