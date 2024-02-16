from sys import stdin

answer = []

N = list(map(int, stdin.readline().rstrip().split()))[0]
for _ in range(N):
    name, s1, s2, s3 = list(map(str, stdin.readline().rstrip().split()))
    answer.append((int(s1), int(s2), int(s3), name))

answer.sort(key=lambda x: (-(x[0]), x[1], -(x[2]), x[3]))

for a in answer:
    print(a[3])
