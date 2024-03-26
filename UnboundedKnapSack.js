// Problem statement
// You are given ‘n’ items with certain ‘profit’ and ‘weight’ and a knapsack with weight capacity ‘w’.
// You need to fill the knapsack with the items in such a way that you get the maximum profit. You are allowed to take one item multiple times.

// Example:
// Input:
// 'n' = 3, 'w' = 10,
// 'profit' = [5, 11, 13]
// 'weight' = [2, 4, 6]

// Output: 27

// Explanation:
// We can fill the knapsack as:

// 1 item of weight 6 and 1 item of weight 4.
// 1 item of weight 6 and 2 items of weight 2.
// 2 items of weight 4 and 1 item of weight 2.
// 5 items of weight 2.

// The maximum profit will be from case 3 = 11 + 11 + 5 = 27. Therefore maximum profit = 27.

// Detailed explanation ( Input/output format, Notes, Images )
// Sample Input 1:
// 7 2 4
// 5 10 20

// Expected Answer:
// 21

// Output on console:
// 21

// Explanation of Sample Input 1
// The given knapsack capacity is 15. We can fill the knapsack as [1, 1, 1] giving us profit 21 and as [1,2] giving us profit 9. Thus maximum profit will be 21.

// Sample Input 2
// 6 12
// 4 17

// Expected Answer:
// 0

// Output on console:
// 0

// Explanation of Sample Input 2:
// We can clearly see that no item has weight less than knapsack capacity. Therefore we can not fill knapsack with any item.

// Expected Time Complexity:
// Try to solve this in O(n*w).

// Constraints
// 1 <= n <= 10^3
// 1 <= w <= 10^3
// 1 <= profit[i] , weight[i] <= 10^8

// RECURSIVE APPROACH
// T.C = >>O(2^n) [standing on the same ind]
// S.C = >>O(n)
function knapSack(w, val, maxW) {
  function f(ind, remainingWeight) {
    // if the w = 3 and remW = 8 so (8 / 3) = 2 and we have to add value also so 2 * 5 = 10 so we add the value 10 as 5 is taken 2 times.
    if (ind === 0) {
      return Math.floor(remainingWeight / w[ind]) * val[ind];
    }

    let notTake = 0 + f(ind - 1, remainingWeight);
    let take = -Infinity;
    if (w[ind] <= remainingWeight) {
      take = val[ind] + f(ind, remainingWeight - w[ind]);
    }
    return Math.max(notTake, take);
  }
  return f(val.length - 1, maxW);
}

let w = [2, 4, 6];
let val = [5, 11, 13];
let maxW = 10;

console.log(knapSack(w, val, maxW)); // Output: 27

// DP APPROACH
// T.C = O(w*val)
// S.C = O(w*val) + O(n)
function knapSack(w, val, maxW) {
  const m = val.length;
  const n = maxW + 1;
  const dp = Array.from({ length: m }, () => Array(n).fill(-1));
  function f(ind, remainingWeight) {
    // if the w = 3 and remW = 8 so (8 / 3) = 2 and we have to add value also so 2 * 5 = 10 so we add the value 10 as 5 is taken 2 times.
    if (ind === 0) {
      return Math.floor(remainingWeight / w[ind]) * val[ind];
    }
    if (dp[ind][remainingWeight] !== -1) return dp[ind][remainingWeight];

    let notTake = 0 + f(ind - 1, remainingWeight);
    let take = -Infinity;
    if (w[ind] <= remainingWeight) {
      take = val[ind] + f(ind, remainingWeight - w[ind]);
    }
    return (dp[ind][remainingWeight] = Math.max(notTake, take));
  }
  return f(m - 1, maxW);
}

let w2 = [2, 4, 6];
let val2 = [5, 11, 13];
let maxW2 = 10;

console.log(knapSack(w2, val2, maxW2)); // Output: 27

// TABULATION
// T.C = O(w*val)
// S.C = O(w*val) // Removed O(n)
function knapSack(w, val, maxW) {
  const m = val.length;
  const n = maxW + 1;
  const dp = Array.from({ length: m }, () => Array(n).fill(0));

  for (let i = w[0]; i <= maxW; i++) {
    dp[0][i] = Math.floor(i / w[0]) * val[0];
  }

  for (let ind = 1; ind < m; ind++) {
    for (let remW = 0; remW <= maxW; remW++) {
      let notTake = 0 + dp[ind - 1][remW];
      let take = -Infinity;
      if (w[ind] <= remW) {
        take = val[ind] + dp[ind][remW - w[ind]];
      }
      dp[ind][remW] = Math.max(notTake, take);
    }
  }
  return dp[m - 1][maxW];
}

let w3 = [2, 4, 6];
let val3 = [5, 11, 13];
let maxW3 = 10;

console.log(knapSack(w3, val3, maxW3)); // Output: 27
