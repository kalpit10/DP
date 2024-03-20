// Problem statement
// A thief is robbing a store and can carry a maximal weight of W into his knapsack.
// There are N items and the ith item weighs wi and is of value vi.
// Considering the constraints of the maximum weight that a knapsack can carry,
// you have to find and return the maximum value that a thief can generate by stealing items.

// Constraints:
// 1 <= T <= 10
// 1 <= N <= 10^2
// 1<= wi <= 50
// 1 <= vi <= 10^2
// 1 <= W <= 10^3

// Time Limit: 1 second
// Sample Input:
// 1
// 4
// 1 2 4 5
// 5 4 8 6
// 5
// Sample Output:
// 13

// RECURSION APPROACH WAS O(2^n) in T.C and O(n) in S.C

// DP APPROACH
// T.C = O(w*val)
// S.C = O(w*val) + O(n)
function knapSack(w, val, n, maxW) {
  let m = val.length;
  let o = maxW + 1;
  let dp = Array.from({ length: m }, () => Array(o).fill(-1));

  function f(ind, remainingWeight) {
    if (ind === 0) {
      // Base case for the first index
      if (w[0] <= remainingWeight) return val[0];
      else return 0;
    }
    if (dp[ind][remainingWeight] !== -1) return dp[ind][remainingWeight];

    let notTake = f(ind - 1, remainingWeight); // Recursive call for the previous index
    let take = -Infinity;

    if (w[ind] <= remainingWeight) {
      take = val[ind] + f(ind - 1, remainingWeight - w[ind]); // Recursive call for the previous index
    }

    return (dp[ind][remainingWeight] = Math.max(notTake, take));
  }

  return f(m - 1, maxW); // Start from the last index
}

let w = [1, 2, 4, 5];
let val = [5, 4, 8, 6];
let n = w.length; // Length of the arrays
let maxW = 5;

console.log(knapSack(w, val, n, maxW)); // Output: 70

// TABULATION
// T.C = O(w*val)
// S.C = O(w*val) //Removed O(n)
function knapSack(w, val, n, maxW) {
  // Initialize a table to store results of subproblems
  const dp = Array.from({ length: n }, () => Array(maxW + 1).fill(0));

  // Base Condition: Fill the first row of 'dp' for the first item
  for (let i = w[0]; i <= maxW; i++) {
    dp[0][i] = val[0];
  }

  // Fill the dp table in bottom-up manner
  for (let ind = 1; ind < n; ind++) {
    for (let remainingWeight = 0; remainingWeight <= maxW; remainingWeight++) {
      const notTake = dp[ind - 1][remainingWeight];

      let take = -Infinity; // Change 'const' to 'let'

      if (w[ind] <= remainingWeight) {
        take = val[ind] + dp[ind - 1][remainingWeight - w[ind]]; // Fix index here
      }

      dp[ind][remainingWeight] = Math.max(notTake, take); // Store result without returning
    }
  }

  // The result is stored at the bottom-right cell of the dp table
  return dp[n - 1][maxW];
}

let w2 = [3, 2, 5];
let val2 = [30, 40, 60];
let n2 = w.length; // Length of the arrays
let maxW2 = 5;

console.log(knapSack(w2, val2, n2, maxW2)); // Output: 70
