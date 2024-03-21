// LC 322
// You are given an integer array coins representing coins of different denominations and an integer amount representing a total amount of money.

// Return the fewest number of coins that you need to make up that amount. If that amount of money cannot be made up by any combination of the coins, return -1.

// You may assume that you have an infinite number of each kind of coin.

// Example 1:

// Input: coins = [1,2,5], amount = 11
// Output: 3
// Explanation: 11 = 5 + 5 + 1
// Example 2:

// Input: coins = [2], amount = 3
// Output: -1
// Example 3:

// Input: coins = [1], amount = 0
// Output: 0

// Constraints:

// 1 <= coins.length <= 12
// 1 <= coins[i] <= 231 - 1
// 0 <= amount <= 104

// RECURSIVE APPROACH (T.L.E)
// T.C = >>O(2^n)
// S.C = >>O(n)
var coinChange = function (coins, amount) {
  function f(ind, target) {
    if (ind === 0) {
      // if it divides completely then return the total number. For eg 6 % 3 = 0, so 6 / 3 = 2 willl return
      if (target % coins[ind] === 0) return target / coins[ind];
      else return Infinity;
    }
    let notTake = 0 + f(ind - 1, target);
    // always take a bigger value if finding min
    let take = Infinity;
    if (coins[ind] <= target) {
      // dont move till it goes target < coins[ind], it will count all possible variations here only
      // if we can use infinite/ multiple use of a thing we donot decrease index until it goes till the extent it does not match if condition
      // so it automatically decreses  when it goes in notTake
      take = 1 + f(ind, target - coins[ind]);
    }

    return Math.min(notTake, take);
  }
  const ans = f(coins.length - 1, amount);
  if (ans === Infinity) return -1;
  return ans;
};

const coin1 = [1, 2, 5];
const amount1 = 11;
console.log(coinChange(coin1, amount1));

// DP APPROACH
// T.C = O(coins * amount)
// S.C = O(coins * amount) + O(n)
var coinChange = function (coins, amount) {
  const m = coins.length;
  const n = amount + 1;
  const dp = Array.from({ length: m }, () => Array(n).fill(-1));
  function f(ind, target) {
    if (ind === 0) {
      // if it divides completely then return the total number. For eg 6 % 3 = 0, so 6 / 3 = 2 willl return
      if (target % coins[ind] === 0) return target / coins[ind];
      else return Infinity;
    }

    if (dp[ind][target] !== -1) return dp[ind][target];

    let notTake = 0 + f(ind - 1, target);
    // always take a bigger value if finding min
    let take = Infinity;
    if (coins[ind] <= target) {
      // dont move till it goes target < coins[ind], it will count all possible variations here only
      take = 1 + f(ind, target - coins[ind]);
    }

    return (dp[ind][target] = Math.min(notTake, take));
  }
  const ans = f(m - 1, amount);
  if (ans === Infinity) return -1;
  return ans;
};

const coin2 = [1, 2, 5];
const amount2 = 11;
console.log(coinChange(coin2, amount2));

// TABULATION
// T.C = O(coins * amount)
// S.C = O(coins * amount) // Removed O(n)
var coinChange = function (coins, amount) {
  const m = coins.length;
  const dp = Array.from({ length: m }, () => Array(amount + 1).fill(0));

  // Base Case Initialization
  for (let t = 0; t <= amount; t++) {
    if (t % coins[0] === 0) {
      dp[0][t] = t / coins[0];
    } else {
      dp[0][t] = Infinity;
    }
  }

  for (let ind = 1; ind < m; ind++) {
    for (let j = 0; j <= amount; j++) {
      let notTake = dp[ind - 1][j];
      let take = Infinity;
      if (coins[ind] <= j) {
        take = 1 + dp[ind][j - coins[ind]];
      }
      dp[ind][j] = Math.min(take, notTake);
    }
  }

  const ans = dp[m - 1][amount];
  return ans === Infinity ? -1 : ans;
};

const coin3 = [1, 2, 5];
const amount3 = 11;
console.log(coinChange(coin3, amount3)); // Output: 3
