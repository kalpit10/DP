// Problem statement
// You are given an array/list ‘ARR’ of ‘N’ positive integers and an integer ‘K’. Your task is to check if there exists a subset in ‘ARR’ with a sum equal to ‘K’.

// Note: Return true if there exists a subset with sum equal to ‘K’. Otherwise, return false.

// For Example :
// If ‘ARR’ is {1,2,3,4} and ‘K’ = 4, then there exists 2 subsets with sum = 4. These are {1,3} and {4}. Hence, return true.

// Recursive Approach
//T.C = O(2^n)
//S.C = O(n)
function subsetSumToK(nums, k) {
  function f(ind, target) {
    if (target === 0) return true;
    if (ind === 0) return ind === target ? true : false;

    let notTake = f(ind - 1, target);
    let take = 0;

    if (nums[ind] <= target) {
      take = f(ind - 1, target - nums[ind]);
    }

    return take || notTake;
  }
  return f(nums.length - 1, k);
}

const nums1 = [1, 0];
const k = 2;

console.log(subsetSumToK(nums1, k));

//DP APPROACH
// T.C = O(m*n)
// S.C = O(m*n) + O(n)
function subsetSumToK(nums, k) {
  const m = nums.length;
  const n = k + 1;
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
  return f(m - 1, k);
}

const nums2 = [1, 0, 1];
const k2 = 2;

console.log(subsetSumToK(nums2, k2));
