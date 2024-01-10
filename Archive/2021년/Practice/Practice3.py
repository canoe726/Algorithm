cards = [12, 7, 11, 6, 2, 12]
# cards = [1, 4, 10, 6, 9, 1, 8, 13]
# cards = [10, 13, 10, 1, 2, 3, 4, 5, 6, 2]
# cards = [3, 3, 3, 3, 3, 3, 3, 3, 3, 3]

def startGame(cards, turn, round, pSum, dSum, money):
  if round >= len(cards):
    return

  startGame()


def solution(cards):
  money = [0]
  startGame(cards, 'P', 1, 0, 0, money)

solution(cards)
