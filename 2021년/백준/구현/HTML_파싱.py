import re

# html = '<main><div title="title_name_1"><p>paragraph 1</p><p>paragraph 2 <i>Italic Tag</i> <br > </p><p>paragraph 3 <b>Bold Tag</b> end.</p></div><div title="title_name_2"><p>paragraph 4</p><p>paragraph 5 <i>Italic Tag 2</i> <br > end.</p></div></main>'

html = input()

# divStart = html.find('<div')
# divEnd = html.find('</div>')
# parsed = '<p> par  agr  aph 2 </p>'
# parsed = "<p>paragraph 1</p><p> paragraph 2 <i>Italic Tag</i> <br > </p><p>paragraph 3 <b>Bold Tag</b> end.</p>"
# newP = re.sub('<[a-zA-Z ]*>|</[a-zA-Z ]*>', '', parsed)
# newP = re.sub('^[ ]|[ ]$', '', newP)
# newP = re.sub('  ', ' ', newP)

# print(newP, len(newP))

def printTitle(html):
  lastIdx = -1
  title = ''
  if html.find('title="') >= 0:
    tIdx = html.find('title="') + len('title="')
    for idx in range(tIdx, len(html)):
      if html[idx] == '"':
        lastIdx = idx + 2
        break
      title += html[idx]
    print('title :', title)
  return lastIdx

def parse(html, paragraphs):
  divEnd = html.find('</div>')
  
  html = html[:divEnd]
  while True:
    pStart = html.find('<p>')
    pEnd = html.find('</p>') + len('</p>')

    parsed = html[(pStart + len('<p>')):pEnd]
    if pStart >= 0 and pEnd >= 0:
      newP = re.sub('<[a-zA-Z ]*>|</[a-zA-Z ]*>', '', parsed)
      newP = re.sub('^[ ]|[ ]$', '', newP)
      newP = re.sub('  ', ' ', newP)
      paragraphs.append(newP)

      html = html[pEnd:]
    else:
      break

  return divEnd + len('</div>')

def search(html):
  lastIdx = printTitle(html)
  if lastIdx >= 0:
    html = html[lastIdx:]
  else:
    return
    
  paragraphs = []
  parsedIdx = parse(html, paragraphs)
  for paragraph in paragraphs:
    print(paragraph)

  search(html[parsedIdx:])

def solution(html):
  search(html)

solution(html)
