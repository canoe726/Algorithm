#include <iostream>

using namespace std;

long long getMultiply(long long A, long long B, long long C) {
  if (B == 1) {
    return A % C;
  }

  long long number = getMultiply(A, B / 2, C) % C;

  if (B % 2 == 0) {
    return (number * number) % C;
  }
  return (A * ((number * number) % C)) % C;
};

int main(void) {
  // freopen("input", "r", stdin);

  long long A, B, C, answer;

  cin >> A >> B >> C;

  answer = getMultiply(A, B, C);

  cout << answer;

  return 0;
}