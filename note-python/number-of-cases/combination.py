def combination(arr, r):
    result = []
    arr = sorted(arr)
    used = [False for _ in range(len(arr))]

    def generate(chosen):
        if len(chosen) == r:
            result.append(tuple(chosen))
            return

        start = arr.index(chosen[-1]) + 1 if chosen else 0

        for next in range(start, len(arr)):
            if not used[next] and (
                next == 0 or arr[next - 1] != arr[next] or used[next - 1]
            ):
                used[next] = True
                chosen.append(arr[next])
                generate(chosen)
                used[next] = False
                chosen.pop()

    generate([])

    return result


if __name__ == "__main__":
    arr = ["a", "b", "c", "d"]
    r = 2

    print(combination(arr, r))
