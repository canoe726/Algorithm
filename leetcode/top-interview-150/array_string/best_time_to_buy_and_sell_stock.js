/**
 * @param {number[]} prices
 * @return {number}
 */
var maxProfit = function (prices) {
  let buy = 0;
  let profit = 0;

  for (let sell = 1; sell < prices.length; sell++) {
    if (prices[buy] > prices[sell]) {
      buy = sell;
    }

    if (profit < prices[sell] - prices[buy]) {
      profit = prices[sell] - prices[buy];
    }
  }

  return profit;
};
