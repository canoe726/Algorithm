// 스택 Min
// push, pop 기능을 가진 스택에서 최솟값을 반환하는 min 함수 추가
// 모두 O(1) 시간에 동작

class Stack1 {
  constructor () {
    this.arr = [];
  }

  push (value) {
    this.arr.push({
      value: value,
      min: Math.min(value, this.min())
    });
  }

  pop () {
    return this.arr.pop();
  }

  top () {
    return this.arr[this.arr.length - 1];
  }

  empty () {
    return this.arr.length === 0;
  }

  min () {
    if (this.empty()) {
      return Number.MAX_SAFE_INTEGER;
    } else {
      return this.top().min;
    }
  }
}

// 1. 상태 저장
const solution1 = () => {
  const stack = new Stack1();
  stack.push(5);
  stack.push(6);
  stack.push(3);
  stack.push(7);
  stack.pop();
  stack.pop();
  return stack.min();
}
// console.log(solution1() === 5);

class Stack2 {
  constructor () {
    this.arr = [];
    this.s2 = new Stack1();
  }

  push (value) {
    if (value <= this.min()) {
      this.s2.push(value);
    }
    this.arr.push(value);
  }

  pop () {
    const value = this.arr.pop();
    if (value === this.min()) {
      this.s2.pop();
    }
    return value;
  }

  empty () {
    return this.arr.length === 0;
  }

  top () {
    return this.arr[this.arr.length - 1];
  }

  min () {
    if (this.s2.empty()) {
      return Number.MAX_SAFE_INTEGER;
    } else {
      return this.s2.top();
    }
  }
}

// 2. 2개의 스택
const solution2 = () => {
  const stack = new Stack2();
  stack.push(5);
  console.log(stack.s2.min())
  stack.push(6);
  console.log(stack.s2.min())
  stack.push(3);
  console.log(stack.s2.min())
  stack.push(7);
  console.log(stack.s2.min())
  stack.pop();
  console.log(stack.s2.min())
  stack.pop();
  console.log(stack.s2.min())
  return stack.s2.min();
}
console.log(solution2() === 5);