/**
 * @param {number[]} prices
 * @return {number}
 */
var maxProfit = function (prices) {
  let buy = 0;
  let profit = 0;

  for (let sell = 1; sell < prices.length; sell++) {
    if (prices[sell] > prices[buy]) {
      profit += prices[sell] - prices[buy];
    }

    buy = sell;
  }

  return profit;
};
