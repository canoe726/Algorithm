from collections import deque

queue = deque()

queue.append(3)
queue.append(5)
queue.append(2)
queue.popleft()

queue.reverse() # 출력을 위해 역순으로 변경
print(queue)





