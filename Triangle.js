// LC PROBLEM 120
// Given a triangle array, return the minimum path sum from top to bottom.

// For each step, you may move to an adjacent number of the row below. More formally, if you are on index i on the current row, you may move to either index i or index i + 1 on the next row.

// Example 1:

// Input: triangle = [[2],[3,4],[6,5,7],[4,1,8,3]]
// Output: 11
// Explanation: The triangle looks like:
//    2
//   3 4
//  6 5 7
// 4 1 8 3
// The minimum path sum from top to bottom is 2 + 3 + 5 + 1 = 11 (underlined above).
// Example 2:

// Input: triangle = [[-10]]
// Output: -10

// RECURSIVE SOLUTION
// T.C = O(2^n) as the elements increase from 1 to n
// S.C = O(n)
var minimumTotal = function (triangle) {
  function f(i, j) {
    // Here, we are starting from first row not the last
    // So, the destination is always the base case
    if (i === triangle.length - 1) return triangle[triangle.length - 1][j];

    // Move down the row
    let down = triangle[i][j] + f(i + 1, j);
    //Move down the row as well as go diagonally in right angled triangle
    let diag = triangle[i][j] + f(i + 1, j + 1);

    return Math.min(down, diag);
  }
  return f(0, 0);
};

const triangle = [[2], [3, 4], [6, 5, 7], [4, 1, 8, 3]];

console.log(minimumTotal(triangle));

// DP APPROACH
// T.C = o(n * n) For each row i have 2 options down or diagonal
// S.C = o(n * n) + O(n) dp array + recursive stack space
var minimumTotal = function (triangle) {
  const n = triangle.length;

  const dp = Array.from({ length: n }, () => Array(n).fill(-1));
  function f(i, j) {
    // Here, we are starting from first row not the last
    // So, the destination is always the base case
    if (i === triangle.length - 1) return triangle[triangle.length - 1][j];
    if (dp[i][j] !== -1) return dp[i][j];

    // Move down the row
    let down = triangle[i][j] + f(i + 1, j);
    //Move down the row as well as go diagonally in right angled triangle
    let diag = triangle[i][j] + f(i + 1, j + 1);

    return (dp[i][j] = Math.min(down, diag));
  }
  return f(0, 0);
};
