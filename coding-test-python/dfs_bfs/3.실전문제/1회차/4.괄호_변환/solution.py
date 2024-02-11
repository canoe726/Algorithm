def get_uv(w):
    u = ""
    v = ""
    left = 0
    right = 0
    idx = 0

    while idx < len(w):
        if w[idx] == "(":
            left += 1
        elif w[idx] == ")":
            right += 1

        u += w[idx]
        idx += 1

        if left > 0 and right > 0 and left == right:
            break

    for i in range(idx, len(w)):
        v += w[i]

    return [u, v]


def valid(w):
    is_valid = False
    stack = 0

    for ch in w:
        if ch == "(":
            stack += 1
        else:
            if stack == 0:
                return False
            stack -= 1

    if stack == 0:
        is_valid = True

    return is_valid


def find_answer(w):
    if len(w) == 0:
        return ""

    u, v = get_uv(w)

    if valid(u):
        return u + find_answer(v)
    else:
        temp = "(" + find_answer(v) + ")"
        temp_u = u[1:-1]
        reverse_u = ""

        for tu in temp_u:
            if tu == "(":
                reverse_u += ")"
            else:
                reverse_u += "("

        return temp + reverse_u


def solution(w):
    return find_answer(w)
