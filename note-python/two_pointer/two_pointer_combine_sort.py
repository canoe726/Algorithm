arr1 = [1, 3, 5, 11, 12]
arr2 = [2, 4, 6, 8]


def get_combined_sorted_list(arr1, arr2):
    sorted = []

    arr1_idx = 0
    arr2_idx = 0

    while True:
        if len(arr1) <= arr1_idx:
            for i in range(arr2_idx, len(arr2)):
                sorted.append(arr2[i])
            break

        if len(arr2) <= arr2_idx:
            for i in range(arr1_idx, len(arr1)):
                sorted.append(arr1[i])
            break

        if arr1[arr1_idx] > arr2[arr2_idx]:
            sorted.append(arr2[arr2_idx])
            arr2_idx += 1
        else:
            sorted.append(arr1[arr1_idx])
            arr1_idx += 1

    return sorted


print(get_combined_sorted_list(arr1, arr2))
