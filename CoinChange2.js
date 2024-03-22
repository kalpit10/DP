// LC 518
// You are given an integer array coins representing coins of different denominations and an integer amount representing a total amount of money.

// Return the number of combinations that make up that amount. If that amount of money cannot be made up by any combination of the coins, return 0.

// You may assume that you have an infinite number of each kind of coin.

// The answer is guaranteed to fit into a signed 32-bit integer.

// Example 1:

// Input: amount = 5, coins = [1,2,5]
// Output: 4
// Explanation: there are four ways to make up the amount:
// 5=5
// 5=2+2+1
// 5=2+1+1+1
// 5=1+1+1+1+1
// Example 2:

// Input: amount = 3, coins = [2]
// Output: 0
// Explanation: the amount of 3 cannot be made up just with coins of 2.
// Example 3:

// Input: amount = 10, coins = [10]
// Output: 1

// Constraints:

// 1 <= coins.length <= 300
// 1 <= coins[i] <= 5000
// All the values of coins are unique.
// 0 <= amount <= 5000

// T.C = O(coins * amount)
// S.C = O(coins * amount) + O(n)
var change = function (amount, coins) {
  const m = coins.length;
  const n = amount + 1;
  const dp = Array.from({ length: m }, () => Array(n).fill(-1));
  function f(ind, target) {
    if (ind === 0) {
      // if it divides completely then return the total number. For eg 6 % 3 = 0, so 1 will return
      return target % coins[ind] === 0 ? 1 : 0;
    }

    if (dp[ind][target] !== -1) return dp[ind][target];

    let notTake = f(ind - 1, target);
    // always take a bigger value if finding min
    let take = 0;
    if (coins[ind] <= target) {
      // dont move till it goes target < coins[ind], it will count all possible variations here only
      take = f(ind, target - coins[ind]);
    }

    return (dp[ind][target] = take + notTake);
  }
  const ans = f(m - 1, amount);
  return ans;
};

// Tabulation
// T.C = O(coins * amount)
// S.C = O(coins * amount)
var change = function (amount, coins) {
  const m = coins.length;
  const n = amount + 1;
  const dp = Array.from({ length: m }, () => Array(n).fill(-1));

  // Base Case
  // t can be anything from 0 till target on index 0
  for (let t = 0; t <= amount; t++) {
    if (t % coins[0] === 0) {
      dp[0][t] = 1;
    } else {
      dp[0][t] = 0;
    }
  }

  for (let ind = 1; ind < coins.length; ind++) {
    for (let target = 0; target <= amount; target++) {
      let notTake = dp[ind - 1][target];
      // always take a bigger value if finding min
      let take = 0;
      if (coins[ind] <= target) {
        // dont move till it goes target < coins[ind], it will count all possible variations here only
        take = dp[ind][target - coins[ind]];
      }

      dp[ind][target] = take + notTake;
    }
  }
  return dp[m - 1][amount];
};
