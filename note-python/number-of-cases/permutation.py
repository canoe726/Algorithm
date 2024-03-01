def permutation(arr, r):
    arr = sorted(arr)
    used = [False for _ in range(len(arr))]
    result = []

    def generate(chosen, used):
        if len(chosen) == r:
            result.append(tuple(chosen))
            return

        for i in range(len(arr)):
            if not used[i] and (i == 0 or arr[i - 1] != arr[i] or used[i - 1]):
                chosen.append(arr[i])
                used[i] = True
                generate(chosen, used)
                used[i] = False
                chosen.pop()

    generate([], used)
    return result


if __name__ == "__main__":
    arr = ["a", "b", "c", "d"]  # "ABAC"
    r = 2

    print(permutation(arr, r))
