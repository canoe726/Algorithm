#include <iostream>
#include <vector>
#include <algorithm>

using namespace std;

struct Cube {
  int length;
  int width;
  int height;
};

bool compare(Cube &a, Cube &b) {
  return a.width - b.width;
}

void getMaxCube(Cube cube, vector<Cube> cubes, int answer[]) {
  Cube lastCube = cubes.back();

  if (cubes.size() == 0) {
    answer[0] = -1;
    return;
  }
  if (cube.width == 0 || cube.height == 0) {
    return;
  }

  if (cube.width == lastCube.width && cube.height == lastCube.height) {
    
  }
  // else if (cube.width <= lastCube.width && cube.height > lastCube.height) {

  // }
  
}

int main(void) {
  // 제출 시 주석처리
  freopen("input", "r", stdin);

  int answer[1] = {0};
  int length, width, height, n;
  Cube cube;
  vector<Cube> cubes;

  cin >> length >> width >> height;
  cin >> n;

  cube.length = length;
  cube.width = width;
  cube.height = height;

  for (int i = 0; i < n; i++) {
    int A, B;
    cin >> A >> B;

    Cube newCube;
    newCube.width = A;
    newCube.height = A;
    newCube.length = A * B;

    cubes.push_back(newCube);
  }
  sort(cubes.begin(), cubes.end(), compare);

  getMaxCube(cube, cubes, answer);

  cout << answer[0];

  return 0;
}