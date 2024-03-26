function Node(value) {
  let data = value;
  let next = null;

  return {
    data,
    next,
  };
}

function Stack() {
  let stack = null;
  let last = null;
  let size = 0;

  function len() {
    return size;
  }

  function push(value) {
    const newNode = Node(value);
    size += 1;

    if (stack === null) {
      stack = newNode;
      return;
    }

    let temp = stack;
    while (temp.next) {
      temp = temp.next;
    }
    temp.next = newNode;
    last = temp.next;
  }

  function pop() {
    if (stack === null) {
      return null;
    }
    size -= 1;
    if (stack.next === null) {
      const popData = stack.data;
      stack = null;
      return popData;
    }
    const popData = last.data;

    let prev = null;
    let temp = stack;
    while (temp.next) {
      prev = temp;
      temp = temp.next;
    }
    prev.next = null;
    last = prev;

    return popData;
  }

  function top() {
    if (stack === null) {
      return null;
    }
    if (stack.next === null) {
      return stack.data;
    }
    return last.data;
  }

  return {
    push,
    pop,
    top,
    len,
  };
}

function processData(input) {
  const inputs = input.split('\n');
  const query = parseInt(inputs[0], 10);

  const stack1 = Stack();
  const stack2 = Stack();

  for (let i = 1; i <= query; i++) {
    const [type, v] = inputs[i].split(' ');

    if (type === '1') {
      const value = parseInt(v, 10);
      stack1.push(value);
      continue;
    }
    if (type === '2') {
      if (!stack2.top()) {
        while (stack1.len() > 0) {
          stack2.push(stack1.pop());
        }
      }
      stack2.pop();
      continue;
    }
    if (type === '3') {
      if (!stack2.top()) {
        while (stack1.len() > 0) {
          stack2.push(stack1.pop());
        }
      }
      console.log(stack2.top());
      continue;
    }
  }
}

process.stdin.resume();
process.stdin.setEncoding('ascii');
_input = '';
process.stdin.on('data', function (input) {
  _input += input;
});

process.stdin.on('end', function () {
  processData(_input);
});
