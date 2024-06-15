function Node(data) {
  this.data = data;
  this.next = null;
}

function Queue() {
  let head = null;
  let rear = null;

  this.enqueue = (value) => {
    const newNode = new Node(value);

    if (head === null) {
      head = rear = newNode;
      return;
    }

    rear.next = newNode;
    rear = newNode;
  };

  this.dequeue = () => {
    if (this.empty()) {
      return null;
    }
    const popData = head.data;

    if (head === rear) {
      head = null;
      rear = null;
      return popData;
    }

    head = head.next;

    return popData;
  };

  this.empty = () => {
    return head === null;
  };

  this.reverse = () => {
    let prev = null;
    let next = null;
    let current = head;
    rear = head;

    while (current !== null) {
      next = current.next;
      current.next = prev;
      prev = current;
      current = next;
    }

    head = prev;
  };
}
