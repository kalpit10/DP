// LC 494
// You are given an integer array nums and an integer target.

// You want to build an expression out of nums by adding one of the symbols '+' and '-' before each integer in nums and then concatenate all the integers.

// For example, if nums = [2, 1], you can add a '+' before 2 and a '-' before 1 and concatenate them to build the expression "+2-1".
// Return the number of different expressions that you can build, which evaluates to target.

// Example 1:

// Input: nums = [1,1,1,1,1], target = 3
// Output: 5
// Explanation: There are 5 ways to assign symbols to make the sum of nums be target 3.
// -1 + 1 + 1 + 1 + 1 = 3
// +1 - 1 + 1 + 1 + 1 = 3
// +1 + 1 - 1 + 1 + 1 = 3
// +1 + 1 + 1 - 1 + 1 = 3
// +1 + 1 + 1 + 1 - 1 = 3
// Example 2:

// Input: nums = [1], target = 1
// Output: 1

// Constraints:

// 1 <= nums.length <= 20
// 0 <= nums[i] <= 1000
// 0 <= sum(nums[i]) <= 1000
// -1000 <= target <= 1000

// -----------THIS IS THE SAME PROBLEM AS Partition with Given Difference.-----------
// Here we can partition it in + and -
// So it will become S1 + S2 = D[Here D is target]
// For eg:-

// if we think deeper, we can say that the given ‘target’ can be expressed as addition of two integers (say S1 and S2).
// S1 + S2 = target   – (i)

// Now, from where will this S1 and S2 come?  If we are given the array as [a,b,c,d,e], we want to place ‘+’ or ‘-’ signs in front of every array element and then add it. One example is :
// +a-b-c+d+e which can be written as (+a+d+e) + (-b-c).

// Therefore, we can say that S1=(+a+d+e) and S2=(-b-c) for this example.

//  If we calculate the total sum of elements of the array (say totSum), we can can say that,
// S2 = totalSum - S1
// S2 = totalSum - target - S2
// 2S2 = totalSum - target - (ii)

// Now solving for equations (i) and (ii), we can say that
// S2 = (totSum – target)/2    – (iii)

// Therefore this question is modified to “Count Number of subsets with sum (totSum – target)/2 ”.

// T.C = O(nums * target)
// S.C = O(nums * target) + O(n)
var findTargetSumWays = function (nums, target) {
  let totalSum = 0;
  for (let i = 0; i < nums.length; i++) {
    totalSum += nums[i];
  }
  const m = nums.length;
  // we set this due to constraints of target which was giving us range exceeded error.
  // We set n to 2001 because the range of target is from -1000 to 1000, and we add 1 to account for 0.
  const n = 2001;
  const dp = Array.from({ length: m }, () => Array(n).fill(-1));
  if (totalSum - target < 0 || (totalSum - target) % 2 !== 0) return false;

  function f(ind, remainingTarget) {
    if (ind === 0) {
      // If both these conditions are true, it means we have two options to reach our target:
      // We can either add a positive sign (+) before the first number.
      // Or, we can add a negative sign (-) before the first number.
      // Since both options lead to the same result (0), we have two ways to achieve the target.
      if (remainingTarget === 0 && nums[0] === 0) return 2;
      if (remainingTarget === 0 || remainingTarget === nums[0]) return 1;
      return 0;
    }
    // if (ind === 0) return nums[ind] <= remainingTarget ? 1 : 0; // Reached the beginning of the array
    if (dp[ind][remainingTarget] !== -1) return dp[ind][remainingTarget];

    let notPick = f(ind - 1, remainingTarget); // Number of subsequences without including the current element
    let pick = 0;
    if (nums[ind] <= remainingTarget) {
      pick = f(ind - 1, remainingTarget - nums[ind]);
    }

    dp[ind][remainingTarget] = notPick + pick; // Total number of valid subsequences// Store the result
    return dp[ind][remainingTarget];
  }
  return f(m - 1, (totalSum - target) / 2);
};
