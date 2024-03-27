// Problem statement
// Given a rod of length ‘N’ units. The rod can be cut into different sizes and each size has a cost associated with it. Determine the maximum cost obtained by cutting the rod and selling its pieces.

// Note:
// 1. The sizes will range from 1 to ‘N’ and will be integers.
// 2. The sum of the pieces cut should be equal to ‘N’.
// 3. Consider 1-based indexing.

// Constraints:
// 1 <= T <= 50
// 1 <= N <= 100
// 1 <= A[i] <= 100

// Where ‘T’ is the total number of test cases, ‘N’ denotes the length of the rod, and A[i] is the cost of sub-length.

// Sample Input 1:
// 5
// 2 5 7 8 10

// 8
// 3 5 8 9 10 17 17 20

// Sample Output 1:
// 12
// 24
// Explanation of sample input 1:
// Test case 1:

// All possible partitions are:
// 1,1,1,1,1           max_cost=(2+2+2+2+2)=10
// 1,1,1,2             max_cost=(2+2+2+5)=11
// 1,1,3               max_cost=(2+2+7)=11
// 1,4                 max_cost=(2+8)=10
// 5                   max_cost=(10)=10
// 2,3                 max_cost=(5+7)=12
// 1,2,2               max _cost=(1+5+5)=12

// Clearly, if we cut the rod into lengths 1,2,2, or 2,3, we get the maximum cost which is 12.

// Test case 2:

// Possible partitions are:
// 1,1,1,1,1,1,1,1         max_cost=(3+3+3+3+3+3+3+3)=24
// 1,1,1,1,1,1,2           max_cost=(3+3+3+3+3+3+5)=23
// 1,1,1,1,2,2             max_cost=(3+3+3+3+5+5)=22
// and so on….

// If we cut the rod into 8 pieces of length 1, for each piece 3 adds up to the cost. Hence for 8 pieces, we get 8*3 = 24.
// Sample Input 2:
// 6
// 3 5 6 7 10 12
// Sample Output 2:
// 18

// Recursive Approach
// T.C = >>O(2^n)
// S.C = >>O(n)
function cut(price, n) {
  function f(ind, N) {
    let rodLength = ind + 1;
    if (ind === 0) {
      // if n = 12, then at rod length of 1[why 1 is because we no index of 0 means length 1]
      // we can have 12 parts of 1 length and what about the price added so it will be n times * price[0]
      return N * price[0];
    }

    let notTake = 0 + f(ind - 1, N);
    let take = -Infinity;
    if (rodLength <= N) {
      // why we remain at the same index?
      // because we can have rod length mutiple times. we can divide it in 1 length multiple times or any other.
      take = price[ind] + f(ind, N - rodLength);
    }
    return Math.max(notTake, take);
  }
  return f(price.length - 1, n);
}

const price = [2, 5, 7, 8, 10];
const n = 5;
console.log(cut(price, n));

// T.C = O(price*n)
// S.C = O(price*n) + O(n)
function cut(price, n) {
  const m = price.length;
  const o = n + 1;
  const dp = Array.from({ length: m }, () => Array(o).fill(-1));
  function f(ind, N) {
    let rodLength = ind + 1;
    if (ind === 0) {
      // if n = 12, then at rod length of 1[why 1 is because we no index of 0 means length 1]
      // we can have 12 parts of 1 length and what about the price added so it will be n times * price[0]
      return N * price[0];
    }
    if (dp[ind][N] !== -1) return dp[ind][N];

    let notTake = 0 + f(ind - 1, N);
    let take = -Infinity;
    if (rodLength <= N) {
      // why we remain at the same index?
      // because we can have rod length mutiple times. we can divide it in 1 length multiple times or any other.
      take = price[ind] + f(ind, N - rodLength);
    }
    return (dp[ind][N] = Math.max(notTake, take));
  }
  return f(m - 1, n);
}

const price2 = [2, 5, 7, 8, 10];
const n2 = 5;
console.log(cut(price2, n2));

// TABULATION
// T.C = O(price*n)
// S.C = O(price*n) + O(n)
function cut(price, n) {
  const m = price.length;
  const o = n + 1;
  const dp = Array.from({ length: m }, () => Array(o).fill(0));

  for (let N = 0; N <= n; N++) {
    dp[0][N] = N * price[0];
  }

  for (let ind = 1; ind < m; ind++) {
    for (let N = 0; N <= n; N++) {
      let notTake = 0 + dp[ind - 1][N];
      let rodLength = ind + 1;
      let take = -Infinity;
      if (rodLength <= N) {
        // why we remain at the same index?
        // because we can have rod length mutiple times. we can divide it in 1 length multiple times or any other.
        take = price[ind] + dp[ind][N - rodLength];
      }
      dp[ind][N] = Math.max(notTake, take);
    }
  }
  return dp[m - 1][n];
}
const price3 = [2, 5, 7, 8, 10];
const n3 = 5;
console.log(cut(price3, n3));
