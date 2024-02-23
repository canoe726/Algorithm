from itertools import combinations
from sys import stdin

L, C = map(int, stdin.readline().rstrip().split())
chars = list(map(str, stdin.readline().rstrip().split()))
chars.sort()


vowels = ("a", "e", "i", "o", "u")
answer = []

count = 0
for password in combinations(chars, L):
    v, c = 0, 0
    for p in password:
        if p in vowels:
            v += 1
        else:
            c += 1

    if v >= 1 and c >= 2:
        print("".join(password))
