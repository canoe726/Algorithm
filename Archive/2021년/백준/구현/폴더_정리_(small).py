import sys
sys.setrecursionlimit(10**9)

size = list(map(int, input().split()))

disk = {}

N = size[0]
M = size[1]
for i in range(N + M):
  query = input().split(' ')
  P = query[0]
  F = query[1]
  isFolder = int(query[2])

  if not P in disk:
    disk[P] = {
      'folders': [],
      'files': [],
    }

  if isFolder == 1:
    if not F in disk:
      disk[F] = {
        'folders': [],
        'files': [],
      }
    disk[P]['folders'].append(F)
  else:
    disk[P]['files'].append(F)

qSize = int(input())
queries = []
for i in range(qSize):
  query = input()
  queries.append(query)

def search(dir, disk, files):
  files.extend(disk[dir]['files'])

  directories = disk[dir]['folders']
  if len(directories) == 0:
    return

  for directory in directories:
    search(directory, disk, files)

def solution(disk, queries):
  for query in queries:
    query = query.split('/')
    dir = query[-1]
    
    files = []
    search(dir, disk, files)

    typeOfFiles = len(list(set(files)))
    cntOfFiles = len(files)

    print(typeOfFiles, cntOfFiles)

solution(disk, queries)
