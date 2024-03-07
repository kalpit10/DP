// LC PROBLEM 931
// Given an n x n array of integers matrix, return the minimum sum of any falling path through matrix.

// A falling path starts at any element in the first row and chooses the element in the next row that is either directly below or diagonally left/right.
// Specifically, the next element from position (row, col) will be (row + 1, col - 1), (row + 1, col), or (row + 1, col + 1).

// Example 1:

// Input: matrix = [[2,1,3],[6,5,4],[7,8,9]]
// Output: 13
// Explanation: There are two falling paths with a minimum sum as shown.
// Example 2:

// Input: matrix = [[-19,57],[-40,-5]]
// Output: -59
// Explanation: The falling path with a minimum sum is shown.

var minFallingPathSum = function (matrix) {
  function f(i, j) {
    // if diagonal columns get out of bounds so return max value so that we donot consider this path
    if (j < 0 || j >= matrix[0].length) return Infinity;
    if (i === 0) return matrix[0][j];

    let up = matrix[i][j] + f(i - 1, j);
    let leftDiag = matrix[i][j] + f(i - 1, j - 1);
    let rightDiag = matrix[i][j] + f(i - 1, j + 1);

    return Math.min(up, Math.min(leftDiag, rightDiag));
  }
  return f(matrix.length - 1, 0);
};
const matrix1 = [
  [2, 1, 3],
  [6, 5, 4],
  [7, 8, 9],
];

console.log(minFallingPathSum(matrix1));

// T.C = O(n * n)
// S.C = O(n * n) + O(path length)
// GIVES T.L.E
var minFallingPathSum = function (matrix) {
  const n = matrix.length;
  const dp = Array.from({ length: n }, () => Array(n).fill(-1));
  function f(i, j) {
    // if diagonal columns get out of bounds so return max value so that we donot consider this path
    if (j < 0 || j >= matrix[0].length) return Infinity;

    if (i === 0) return matrix[0][j];
    if (dp[i][j] !== -1) return dp[i][j];

    let up = matrix[i][j] + f(i - 1, j);
    let leftDiag = j > 0 ? matrix[i][j] + f(i - 1, j - 1) : Infinity;
    let rightDiag =
      j < matrix[0].length - 1 ? matrix[i][j] + f(i - 1, j + 1) : Infinity;

    return (dp[i][j] = Math.min(up, Math.min(leftDiag, rightDiag)));
  }
  let minSum = Infinity;
  // Iterate through the last row to find the minimum falling path sum
  for (let j = 0; j < n; j++) {
    minSum = Math.min(minSum, f(n - 1, j));
  }

  return minSum;
};

//TABULATION (BOTTOM-UP APPROACH)
//T.C = O(n * n) + O(n) =. extra forloop
// S.C = O(n * n) [Removed O(path length)]
var minFallingPathSum = function (matrix) {
  const n = matrix.length;

  // Create a DP array to store the minimum falling path sum for each cell
  const dp = Array.from({ length: n }, () => Array(n).fill(0));

  // Initialize the first row of the DP array with the values from the matrix
  for (let j = 0; j < n; j++) {
    dp[0][j] = matrix[0][j];
  }

  // Update the DP array with the minimum falling path sum for each cell
  //starting from 1 as we have already dealt with 0 in base case
  for (let i = 1; i < n; i++) {
    for (let j = 0; j < n; j++) {
      dp[i][j] =
        matrix[i][j] +
        Math.min(
          dp[i - 1][j], // Up
          j > 0 ? dp[i - 1][j - 1] : Infinity, // Left diagonal
          j < n - 1 ? dp[i - 1][j + 1] : Infinity // Right diagonal
        );
    }
  }

  // Find the minimum falling path sum in the last row
  let minSum = Infinity;
  for (let j = 0; j < n; j++) {
    minSum = Math.min(minSum, dp[n - 1][j]);
  }

  return minSum;
};
