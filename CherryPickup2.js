// LC PROBLEM 1463
// You are given a rows x cols matrix grid representing a field of cherries where grid[i][j] represents the number of cherries that you can collect from the (i, j) cell.

// You have two robots that can collect cherries for you:

// Robot #1 is located at the top-left corner (0, 0), and
// Robot #2 is located at the top-right corner (0, cols - 1).
// Return the maximum number of cherries collection using both robots by following the rules below:

// From a cell (i, j), robots can move to cell (i + 1, j - 1), (i + 1, j), or (i + 1, j + 1).
// When any robot passes through a cell, It picks up all cherries, and the cell becomes an empty cell.
// When both robots stay in the same cell, only one takes the cherries.
// Both robots cannot move outside of the grid at any moment.
// Both robots should reach the bottom row in grid.

// Example 1:

// Input: grid = [[3,1,1],[2,5,1],[1,5,5],[2,1,1]]
// Output: 24
// Explanation: Path of robot #1 and #2 are described in color green and blue respectively.
// Cherries taken by Robot #1, (3 + 2 + 5 + 2) = 12.
// Cherries taken by Robot #2, (1 + 5 + 5 + 1) = 12.
// Total of cherries: 12 + 12 = 24.

// Example 2:

// Input: grid = [[1,0,0,0,0,0,1],[2,0,0,0,0,3,0],[2,0,9,0,0,0,0],[0,3,0,5,4,0,0],[1,0,2,3,0,0,6]]
// Output: 28
// Explanation: Path of robot #1 and #2 are described in color green and blue respectively.
// Cherries taken by Robot #1, (1 + 9 + 5 + 2) = 17.
// Cherries taken by Robot #2, (1 + 3 + 4 + 3) = 11.
// Total of cherries: 17 + 11 = 28.

// Recursive Approach
// T.C = O(3^n * 3^n) Robot1 has 3 options * Robot2 has 3 options
// S.C = O(n) Stack Space
var cherryPickup = function (grid) {
  function f(i, j1, j2) {
    //we can't go further down, so we return 0 cherries.
    if (i === grid.length) return 0;
    if (j1 < 0 || j1 >= grid[0].length || j2 < 0 || j2 >= grid[0].length)
      return -Infinity;

    let cherries = grid[i][j1] + (j1 !== j2 ? grid[i][j2] : 0);
    let maxCherries = 0;

    for (let dj1 = -1; dj1 <= 1; dj1++) {
      for (let dj2 = -1; dj2 <= 1; dj2++) {
        // j1+dj1 is done as it will calc. where it will go from current column to next colum of next row
        // if we are on 2nd col of first row so in the 2nd row we will be 2 + (-1) if we go left diag.
        // so it will be 1st column of the second row.
        maxCherries = Math.max(
          // It will add the current collected cherries + explore all paths and then return all cherries
          maxCherries,
          cherries + f(i + 1, j1 + dj1, j2 + dj2)
        );
      }
    }

    return maxCherries;
  }

  return f(0, 0, grid[0].length - 1);
};

// DP APPROACH
// T.C = O(m*n^2) for each cell in the grid, we explore all possible next positions for both robots,
// resulting in iterations, and we do this for each row m times.[i, j1, j2 so m * n * n]
// S.C = O(m*n*n) DP ARRAY
var cherryPickup = function (grid) {
  const m = grid.length; // Number of rows in the grid
  const n = grid[0].length; // Number of columns in the grid
  const o = n - 1; // Last column index (0-based indexing)
  const dp = Array.from({ length: m }, () =>
    Array.from(
      { length: n },
      () => Array.from({ length: o + 1 }, () => -1) // Include the last column(declaring it 1 column longer)
    )
  );
  function f(i, j1, j2) {
    //we can't go further down, so we return 0 cherries.
    if (i === grid.length) return 0;
    if (j1 < 0 || j1 >= grid[0].length || j2 < 0 || j2 >= grid[0].length)
      return -Infinity;
    if (dp[i][j1][j2] !== -1) return dp[i][j1][j2];

    let cherries = grid[i][j1] + (j1 !== j2 ? grid[i][j2] : 0);
    let maxCherries = 0;

    for (let dj1 = -1; dj1 <= 1; dj1++) {
      for (let dj2 = -1; dj2 <= 1; dj2++) {
        // j1+dj1 is done as it will calc. where it will go from current column to next colum of next row
        // if we are on 2nd col of firrst row so in the 2nd row we will be 2 + (-1) if we go diag. left
        // so it will be 1st column of the second row.
        // It will add the current collected cherries + explore all paths and then return all cherries
        maxCherries = Math.max(
          maxCherries,
          cherries + f(i + 1, j1 + dj1, j2 + dj2)
        );
      }
    }

    return (dp[i][j1][j2] = maxCherries);
  }

  return f(0, 0, o);
};
