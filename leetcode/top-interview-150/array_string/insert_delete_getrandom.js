var RandomizedSet = function () {
  this.data = new Map();
  this.keys = [];
};

/**
 * @param {number} val
 * @return {boolean}
 */
RandomizedSet.prototype.insert = function (val) {
  if (this.data.has(val)) {
    return false;
  }
  this.keys.push(val);
  this.data.set(val, this.keys.length - 1);
  return true;
};

/**
 * @param {number} val
 * @return {boolean}
 */
RandomizedSet.prototype.remove = function (val) {
  if (!this.data.has(val)) {
    return false;
  }
  var index = this.data.get(val);
  this.keys[index] = this.keys[this.keys.length - 1];

  this.data.set(this.keys[index], index);
  this.keys.pop();
  this.data.delete(val);

  return true;
};

/**
 * @return {number}
 */
RandomizedSet.prototype.getRandom = function () {
  var key = Math.floor(Math.random() * this.keys.length);
  return this.keys[key];
};

var obj = new RandomizedSet();
console.log(obj.remove(0));
console.log(obj.remove(0));
console.log(obj.insert(0));
console.log(obj.getRandom());
console.log(obj.remove(0));
console.log(obj.insert(0));
