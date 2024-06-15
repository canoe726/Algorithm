function Node(data) {
  this.data = data;
  this.next = null;
}

function Stack() {
  let stack = null;

  this.empty = () => {
    return stack === null;
  };

  this.push = (data) => {
    const newNode = new Node(data);
    newNode.next = stack;

    stack = newNode;
  };

  this.pop = () => {
    if (this.empty()) {
      return null;
    }
    const data = this.top();
    stack = stack.next;
    return data;
  };

  this.top = () => {
    if (stack === null) {
      return null;
    }
    return stack.data;
  };
}

/**
 * @param {string} s
 * @return {boolean}
 */
var isValid = function (s) {
  const stack = new Stack();

  for (let i = 0; i < s.length; i++) {
    if (s[i] === '(' || s[i] === '{' || s[i] === '[') {
      stack.push(s[i]);
    } else {
      const top = stack.pop();

      if (
        (top === '(' && s[i] === ')') ||
        (top === '{' && s[i] === '}') ||
        (top === '[' && s[i] === ']')
      ) {
        continue;
      } else {
        return false;
      }
    }
  }

  return stack.empty();
};

console.log(isValid('({()})[]'));
