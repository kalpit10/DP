// Problem statement [MEDIUM -  CODING NINJAS]
// Ninja is planing this ‘N’ days-long training schedule. Each day, he can perform any one of these three activities. (Running, Fighting Practice or Learning New Moves). Each activity has some merit points on each day.
// As Ninja has to improve all his skills, he can’t do the same activity in two consecutive days. Can you help Ninja find out the maximum merit points Ninja can earn?

// You are given a 2D array of size N*3 ‘POINTS’ with the points corresponding to each day and activity. Your task is to calculate the maximum number of merit points that Ninja can earn.

// For Example
// If the given ‘POINTS’ array is [[1,2,5], [3 ,1 ,1] ,[3,3,3] ],the answer will be 11 as 5 + 3 + 3.

// 1 2 5
// 3 1 1
// 3 3 3
//output = 11

// RECURSIVE APPROACH
// T.C = O(3^n) => For each day I have three options, where n is the no. of days
// S.C = O(n) => depth of recursive call stack = no. of days

function f(day, last, points) {
  // Base Case
  if (day === 0) {
    let maxi = 0;
    for (let task = 0; task < 3; task++) {
      // we check if the task completed prev is not used here as we cannot do the same task 2 days in a row
      if (task !== last) {
        maxi = Math.max(maxi, points[0][task]);
      }
    }
    return maxi;
  }
  let maxi = 0;
  for (let task = 0; task < 3; task++) {
    if (task !== last) {
      let point = points[day][task] + f(day - 1, task, points);
      maxi = Math.max(maxi, point);
    }
  }
  return maxi;
}

function ninjaTraining(n, points) {
  return f(n - 1, 3, points);
}

// Example usage:
const points1 = [
  [1, 2, 5],
  [3, 1, 1],
  [3, 3, 3],
];
console.log(ninjaTraining(points1.length, points1)); // Output: 11

const points2 = [
  [10, 40, 70],
  [20, 50, 80],
  [30, 60, 90],
];
console.log(ninjaTraining(points2.length, points2)); // Output: 210

// DP APPROACH
//T.C = O(n)
//S.C = O(n*4) = O(n) => Primarily determined by 2D array which has n*4 dimensions(since we have n days and 4 possible activities including the "last" activity).

function ninjaTraining(n, points) {
  // Create a 2D array 'dp' with dimensions (n x 4) and initialize it with -1
  let dp = new Array(n);
  for (let i = 0; i < n; i++) {
    dp[i] = new Array(4).fill(-1);
  }

  // Define the recursive function 'f' with parameters 'day', 'last', 'points', and 'dp'
  function f(day, last) {
    // If the result is already calculated, return it from 'dp'
    if (dp[day][last] !== -1) return dp[day][last];

    // Base case: When 'day' is 0, calculate the maximum points for the last day
    if (day === 0) {
      let maxi = 0;
      for (let i = 0; i <= 2; i++) {
        if (i !== last) {
          maxi = Math.max(maxi, points[0][i]);
        }
      }
      return (dp[day][last] = maxi);
    }

    // Initialize 'maxi' to store the maximum points
    let maxi = 0;

    // Iterate through the activities for the current day
    for (let i = 0; i <= 2; i++) {
      if (i !== last) {
        // Calculate the points for the current activity and recursively call 'f' for the previous day
        let point = points[day][i] + f(day - 1, i);
        maxi = Math.max(maxi, point);
      }
    }

    // Store the result in 'dp' and return it
    return (dp[day][last] = maxi);
  }

  // Call the recursive function 'f' to find the maximum points starting from day 'n-1' and 'last' activity 3
  return f(n - 1, 3);
}

// Define the 'points' array with the ninja training data
let points = [
  [10, 40, 70],
  [20, 50, 80],
  [30, 60, 90],
];

// Get the number of days
let n = points.length;

// Call the 'ninjaTraining' function and print the result
console.log(ninjaTraining(n, points));
