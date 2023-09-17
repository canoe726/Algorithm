/**
 * 10진수를 n자리의 N진수로 표현
 */
function getNBaseFromDecimal (div, decimal, size) {
  let number = decimal
  let baseNumber = ''
  
  for (let i = 0; i < size; i++) {
      baseNumber += String(number % div)
      number = Math.floor(number / div)
  }
  
  return baseNumber.split('').reverse().join('')
}