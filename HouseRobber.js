// LEETCODE PROBLEM 198

// You are a professional robber planning to rob houses along a street. Each house has a certain amount of money stashed,
// the only constraint stopping you from robbing each of them is that adjacent houses have security systems connected
// and it will automatically contact the police if two adjacent houses were broken into on the same night.

// Given an integer array nums representing the amount of money of each house,
// return the maximum amount of money you can rob tonight without alerting the police.

// Example 1:

// Input: nums = [1,2,3,1]
// Output: 4
// Explanation: Rob house 1 (money = 1) and then rob house 3 (money = 3).
// Total amount you can rob = 1 + 3 = 4.
// Example 2:

// Input: nums = [2,7,9,3,1]
// Output: 12
// Explanation: Rob house 1 (money = 2), rob house 3 (money = 9) and rob house 5 (money = 1).
// Total amount you can rob = 2 + 9 + 1 = 12.

// Constraints:

// 1 <= nums.length <= 100
// 0 <= nums[i] <= 400

// T.C = O(2^n) => For every house there are two options pick or not pick(Worst case)
// S.C = O(n) => recursive stack space for maximum depth n
// var rob = function (nums) {
//     let n = nums.length;
//     function f(ind) {
//         if (ind === 0) return nums[ind];
//         if (ind < 0) return 0;

//         let pick = nums[ind] + f(ind - 2);
//         let notPick = f(ind - 1);

//         return Math.max(pick, notPick);
//     }
//     return f(n - 1);
// };

// Optimised Approach using dp
// T.C = O(n) => We are saving the time of overlapping subproblems so there is only n possibilities i.e f(1), f(2)...f(n)
// S.C => O(n) => Depth of dp array
var rob = function (nums) {
  let n = nums.length;
  if (n === 0) return 0;
  const dp = new Array(n + 1).fill(-1);

  function f(ind) {
    if (ind < 0) return 0;
    if (ind === 0) return nums[ind];
    if (dp[ind] !== -1) return dp[ind];

    let pick = nums[ind] + f(ind - 2);
    let notPick = f(ind - 1);

    return (dp[ind] = Math.max(pick, notPick));
  }
  return f(n - 1);
};

const nums = [2, 4, 9, 1, 7];
console.log(rob(nums));

// TABULATION: -
// T.C = O(n)
// S.C = O(n)

var rob = function (nums) {
  const n = nums.length;
  if (n === 0) return 0;

  const dp = new Array(n + 1).fill(0);
  dp[0] = 0;

  for (let i = 1; i <= n; i++) {
    let take = nums[i - 1];
    // as i = 1 will have the vaue to -1 so we did this
    if (i > 1) take += dp[i - 2];

    let notTake = 0 + dp[i - 1];

    dp[i] = Math.max(take, notTake);
  }

  return dp[n];
};

// Space optimised also => o(1)

var rob = function (nums) {
  const n = nums.length;
  if (n === 0) return 0;

  let prev = 0;
  let prev2 = 0;

  for (let i = 0; i < n; i++) {
    let take = nums[i];
    if (i > 1) take += prev2;
    let notTake = prev;
    let curi = Math.max(take, notTake);
    prev2 = prev;
    prev = curi;
  }
  return prev;
};
