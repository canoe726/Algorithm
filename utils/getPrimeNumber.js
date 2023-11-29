/**
 * 에라토스테네스의 체
 */
function getPrimeNumber(size) {
  const prime = Array.from({ length:size }, (_) => true)
  prime[0] = false, prime[1] = false
  
  for (let i = 2; i * i <= size; i++) {
      if (prime[i]) {
          for (let j = i * 2; j <= size; j+=i) {
              prime[j] = false
          }
      }
  }
  
  return prime
}