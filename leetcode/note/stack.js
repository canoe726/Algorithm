function Node(data) {
  this.data = data;
  this.next = null;
}

function Stack() {
  let stack = null;

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

  this.empty = () => {
    return stack === null;
  };
}
