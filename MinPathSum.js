// LC PROBLEM 64
// Given a m x n grid filled with non-negative numbers, find a path from top left to bottom right, which minimizes the sum of all numbers along its path.

// Note: You can only move either down or right at any point in time.

// Example 1:

// Input: grid = [[1,3,1],[1,5,1],[4,2,1]]
// Output: 7
// Explanation: Because the path 1 → 3 → 1 → 1 → 1 minimizes the sum.
// Example 2:

// Input: grid = [[1,2,3],[4,5,6]]
// Output: 12

// RECURSIVE APPROACH

function minPathSum(grid) {
  function f(i, j) {
    if (i === 0 && j === 0) return grid[i][j];
    if (i < 0 || j < 0) return Infinity;

    let up = grid[i][j] + f(i - 1, j);
    let left = grid[i][j] + f(i, j - 1);

    return Math.min(up, left);
  }
  return f(grid.length - 1, grid[0].lenth - 1);
}

const grid = [
  [1, 3, 1],
  [1, 5, 1],
  [4, 2, 1],
];

console.log(minPathSum(grid));
