import math

N = 1000
is_prime = [True for _ in range(N + 1)]
is_prime[0] = False
is_prime[1] = False


def eratos(n):
    for i in range(2, int(math.sqrt(n)) + 1):
        if is_prime[i] == True:
            j = 2
            while i * j <= n:
                is_prime[i * j] = False
                j += 1


eratos(N)

print(is_prime[7])
print(is_prime[13])
print(is_prime[14])
