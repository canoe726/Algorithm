from sys import stdin

N, C = map(int, stdin.readline().rstrip().split())

pos = []

for _ in range(N):
    p = list(map(int, stdin.readline().rstrip().split()))[0]
    pos.append(p)

pos.sort()

answer = 0
start = 1
end = pos[-1] - pos[0]


while start <= end:
    mid = (start + end) // 2

    count = 1
    router = pos[0]
    # 공유기 설치
    for idx in range(1, len(pos)):
        if pos[idx] - router >= mid:
            router = pos[idx]
            count += 1

    if count >= C:
        answer = mid
        start = mid + 1
    else:
        end = mid - 1

print(answer)
