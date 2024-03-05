// LC MEDIUM PROBLEM 62
// There is a robot on an m x n grid. The robot is initially located at the top-left corner (i.e., grid[0][0]).
// The robot tries to move to the bottom-right corner (i.e., grid[m - 1][n - 1]). The robot can only move either down or right at any point in time.

// Given the two integers m and n, return the number of possible unique paths that the robot can take to reach the bottom-right corner.

// The test cases are generated so that the answer will be less than or equal to 2 * 109.

// Example 1:

// Input: m = 3, n = 7
// Output: 28
// Example 2:

// Input: m = 3, n = 2
// Output: 3
// Explanation: From the top-left corner, there are a total of 3 ways to reach the bottom-right corner:
// 1. Right -> Down -> Down
// 2. Down -> Down -> Right
// 3. Down -> Right -> Down

// T.C = O(2^m*n) => for every box, there are 2 options up and left and its a 2d matrix
// S.C = O(path length) => O(n)
// Recursive Solution (T.L.E)
// function uniquePaths(m, n) {
//   //If it reaches the last point, add the value 1
//   if (m === 0 && n === 0) return 1;
//   // If it goes out of boundary, add 0
//   if (m < 0 && n < 0) return 0;

//   // Row reduces
//   let up = uniquePaths(m - 1, n);
//   // Column reduces
//   let left = uniquePaths(m, n - 1);

//   return up + left;
// }

// const arr = uniquePaths(3, 2);
// console.log(arr);

// DP APPROACH
//T.C = O(m * n) => for visiting it once, it will visit rows and columns
//S.C = O(path length) + O(m*n) => Recursive stack space + dp array storage
function countWaysUtil(i, j, dp) {
  // If we have reached the top-left corner, there is one way to reach it.
  if (i === 0 && j === 0) {
    return 1;
  }

  // If i or j is negative, we are out of bounds, so there are no ways to reach this cell.
  if (i < 0 || j < 0) {
    return 0;
  }

  // If we have already computed the number of ways to reach this cell, return it.
  if (dp[i][j] !== -1) {
    return dp[i][j];
  }

  // Calculate the number of ways to reach this cell by moving up and left.
  // Reduce row
  const up = countWaysUtil(i - 1, j, dp);
  // Reduce column
  const left = countWaysUtil(i, j - 1, dp);

  // Store the result in the dp array and return it.
  dp[i][j] = up + left;
  return dp[i][j];
}
var uniquePaths = function (m, n) {
  //Array.from makes a new array and we are telling that we want a new array with specific characteristics
  // length: m tells how big the array should be, "m" represents the rows in our grid
  // () => Array(n).fill(-1): This is a mapping function that defines how each element in the new array will be initialized.
  // Here, it creates an array with n elements, filled with -1.

  const dp = Array.from({ length: m }, () => Array(n).fill(-1));
  return countWaysUtil(m - 1, n - 1, dp);
};

const arr = uniquePaths(3, 7);
console.log(arr);
