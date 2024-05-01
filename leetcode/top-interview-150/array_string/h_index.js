/**
 * @param {number[]} citations
 * @return {number}
 */
var hIndex = function (citations) {
  let n = citations.length;
  let cites = new Array(citations.length + 1).fill(0);
  let hIndex = 0;

  for (let i = 0; i < n; i++) {
    if (citations[i] >= n) {
      cites[n] += 1;
    } else {
      cites[citations[i]] += 1;
    }
  }

  for (let i = cites.length - 1; i > 0; i--) {
    cites[i - 1] += cites[i];
  }

  for (let i = 0; i < cites.length; i++) {
    if (hIndex <= cites[i]) {
      hIndex += 1;
    }
  }

  return hIndex - 1;
};
