// LC PROBLEM 416
// Given an integer array nums, return true if you can partition the array into two subsets such that the sum of the elements in both subsets is equal or false otherwise.

// Example 1:

// Input: nums = [1,5,11,5]
// Output: true
// Explanation: The array can be partitioned as [1, 5, 5] and [11].
// Example 2:

// Input: nums = [1,2,3,5]
// Output: false
// Explanation: The array cannot be partitioned into equal sum subsets.

// T.C = O(m*n) + O(n) //For loop added.
// S.C = O(m*n)
var canPartition = function (nums) {
  let sum = 0;
  for (let i = 0; i < nums.length; i++) {
    sum += nums[i];
  }
  if (sum % 2 !== 0) return false;
  let target = sum / 2;
  const m = nums.length;
  const n = target + 1;
  const dp = Array.from({ length: m }, () => Array(n).fill(-1));
  function f(ind, target) {
    if (target === 0) return true;
    if (ind === 0) return nums[ind] === target ? true : false;
    if (dp[ind][target] !== -1) return dp[ind][target];
    let notTake = f(ind - 1, target);
    let take = 0;

    if (nums[ind] <= target) {
      take = f(ind - 1, target - nums[ind]);
    }

    return (dp[ind][target] = take || notTake);
  }
  return f(m - 1, target);
};
