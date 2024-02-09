def solution(s):
    s_size = len(s)
    answer = s_size

    for chunk in range(s_size // 2, 0, -1):
        temp = ""

        i = 0
        count = 1
        start = i * chunk
        middle = (i + 1) * chunk
        end = (i + 2) * chunk

        while end <= s_size:
            s_text = s[start:middle]
            e_text = s[middle:end]

            if s_text == e_text:
                count += 1
            else:
                if count >= 2:
                    temp += str(count) + s_text
                else:
                    temp += s_text
                count = 1

            i += 1
            start = i * chunk
            middle = (i + 1) * chunk
            end = (i + 2) * chunk

        if count >= 2:
            temp += str(count) + s[start:s_size]
        else:
            temp += s[start:s_size]

        answer = min(answer, len(temp))

    return answer
