// LC PROBLEM 63
// You are given an m x n integer array grid. There is a robot initially located at the top-left corner (i.e., grid[0][0]). The robot tries to move to the bottom-right corner (i.e., grid[m - 1][n - 1]). The robot can only move either down or right at any point in time.

// An obstacle and space are marked as 1 or 0 respectively in grid. A path that the robot takes cannot include any square that is an obstacle.

// Return the number of possible unique paths that the robot can take to reach the bottom-right corner.

// The testcases are generated so that the answer will be less than or equal to 2 * 109.

// Example 1:

// Input: obstacleGrid = [[0,0,0],[0,1,0],[0,0,0]]
// Output: 2
// Explanation: There is one obstacle in the middle of the 3x3 grid above.
// There are two ways to reach the bottom-right corner:
// 1. Right -> Right -> Down -> Down
// 2. Down -> Down -> Right -> Right
// Example 2:

// Input: obstacleGrid = [[0,1],[0,0]]
// Output: 1

// T.C = O(2^n)
// S.C = O(path length)
var uniquePathsWithObstacles = function (obstacleGrid) {
  function f(i, j) {
    if (i >= 0 && j >= 0 && obstacleGrid[i][j] === 1) return 0;
    if (i === 0 && j === 0) return 1;
    if (i < 0 || j < 0) return 0;

    let up = f(i - 1, j);
    let left = f(i, j - 1);

    return up + left;
  }
  return f(obstacleGrid.length - 1, obstacleGrid[0].length - 1);
};

const obstacleGrid1 = [
  [0, 0, 0],
  [0, 1, 0],
  [0, 0, 0],
];
console.log(uniquePathsWithObstacles(obstacleGrid1));

//T.C = O(m*n)
//S.C=O(m*n)
var uniquePathsWithObstacles = function (obstacleGrid) {
  const m = obstacleGrid.length;
  const n = obstacleGrid[0].length;

  // Initialize the dp array with dimensions (m x n) and fill it with -1
  const dp = Array.from({ length: m }, () => Array(n).fill(-1));

  function f(i, j) {
    if (i >= 0 && j >= 0 && obstacleGrid[i][j] === 1) return 0;
    if (i === 0 && j === 0) return 1;
    if (i < 0 || j < 0) return 0;
    if (dp[i][j] !== -1) return dp[i][j];

    let up = f(i - 1, j);
    let left = f(i, j - 1);

    dp[i][j] = up + left;
    return dp[i][j];
  }

  return f(m - 1, n - 1);
};

const obstacleGrid1 = [
  [0, 0, 0],
  [0, 1, 0],
  [0, 0, 0],
];
console.log(uniquePathsWithObstacles(obstacleGrid1));
