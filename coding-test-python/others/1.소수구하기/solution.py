from sys import stdin
import math

M, N = map(int, stdin.readline().rstrip().split())

INF = 1000000
is_prime = [True for _ in range(INF + 1)]
is_prime[0] = False
is_prime[1] = False


def eratos(n):
    for i in range(2, int(math.sqrt(n)) + 1):
        if is_prime[i] == True:
            j = 2
            while i * j <= n:
                is_prime[i * j] = False
                j += 1


end = M
if N > end:
    end = N

eratos(end)

for i in range(M, N + 1):
    if is_prime[i]:
        print(i)
