// Given an array ‘ARR’, partition it into two subsets (possibly empty) such that their union is the original array. Let the sum of the elements of these two subsets be ‘S1’ and ‘S2’.

// Given a difference ‘D’, count the number of partitions in which ‘S1’ is greater than or equal to ‘S2’ and the difference between ‘S1’ and ‘S2’ is equal to ‘D’. Since the answer may be too large, return it modulo ‘10^9 + 7’.

// If ‘Pi_Sj’ denotes the Subset ‘j’ for Partition ‘i’. Then, two partitions P1 and P2 are considered different if:

// 1) P1_S1 != P2_S1 i.e, at least one of the elements of P1_S1 is different from P2_S2.
// 2) P1_S1 == P2_S2, but the indices set represented by P1_S1 is not equal to the indices set of P2_S2. Here, the indices set of P1_S1 is formed by taking the indices of the elements from which the subset is formed.
// Refer to the example below for clarification.
// Note that the sum of the elements of an empty subset is 0.

// For example :
// If N = 4, D = 3, ARR = {5, 2, 5, 1}
// There are only two possible partitions of this array.
// Partition 1: {5, 2, 1}, {5}. The subset difference between subset sum is: (5 + 2 + 1) - (5) = 3
// Partition 2: {5, 2, 1}, {5}. The subset difference between subset sum is: (5 + 2 + 1) - (5) = 3
// These two partitions are different because, in the 1st partition, S1 contains 5 from index 0, and in the 2nd partition, S1 contains 5 from index 2.
// Input Format :
// The first line contains a single integer ‘T’ denoting the number of test cases, then each test case follows:

// The first line of each test case contains two space-separated integers, ‘N’ and ‘D,’ denoting the number of elements in the array and the desired difference.

// The following line contains N integers denoting the space-separated integers ‘ARR’.
// Output Format :
// For each test case, find the number of partitions satisfying the above conditions modulo 10^9 + 7.
// Output for each test case will be printed on a separate line.
// Note :
// You are not required to print anything; it has already been taken care of. Just implement the function.
// Constraints :
// 1 ≤ T ≤ 10
// 1 ≤ N ≤ 50
// 0 ≤ D ≤ 2500
// 0 ≤ ARR[i] ≤ 50

// Time limit: 1 sec
// Sample Input 1 :
// 5 2 6 4, diff = 3

// 1 1 1 1, diff = 0
// Sample Output 1 :
// 1
// 6
// Explanation For Sample Input 1 :
// For test case 1:
// We will print 1 because :
// There is only one possible partition of this array.
// Partition : {6, 4}, {5, 2}. The subset difference between subset sum is: (6 + 4) - (5 + 2) = 3

// For test case 2:
// We will print 6 because :
// The partition {1, 1}, {1, 1} is repeated 6 times:
// Partition 1 : {ARR[0], ARR[1]}, {ARR[2], ARR[3]}
// Partition 2 : {ARR[0], ARR[2]}, {ARR[1], ARR[3]}
// Partition 3 : {ARR[0], ARR[3]}, {ARR[1], ARR[2]}
// Partition 4 : {ARR[1], ARR[2]}, {ARR[0], ARR[3]}
// Partition 5 : {ARR[1], ARR[3]}, {ARR[0], ARR[2]}
// Partition 6 : {ARR[2], ARR[3]}, {ARR[0], ARR[1]}
// The difference is in the indices chosen for the subset S1(or S2).
// Sample Input 2 :
// 4 6 3, diff = 1
// 3 1 1 2 1, diff = 0
// 3 2 2 5 1, diff = 1
// Sample Output 2 :
// 1
// 6
// 3

// S1 - S2 = D
// S1 = TotalSum - S2
// TotalSum - S2 - S2 = D
// TotalSum - D = 2S2
// S2 = (TotalSum - D) / 2

//Edge Cases
// TotalSum - D >= 0 (it cannnot be negative because of constraints)
// totalsum - D has to be even (no fractions or decimals are allowed)

// T.C = O(m * target) + O(n)
// S.C = O(m * target) + O(n)
var numSubseq = function (nums, target, d) {
  let totalSum = 0;
  const mod = 1e9 + 7;
  for (let i = 0; i < nums.length; i++) {
    totalSum += nums[i];
  }
  const m = nums.length;
  const n = target + 1;
  const dp = Array.from({ length: m }, () => Array(n).fill(-1));
  if (totalSum - d < 0 || (totalSum - d) % 2 !== 0) return false;

  function f(ind, target) {
    if (ind === 0) {
      if (target === 0 && nums[0] === 0) return 2;
      if (target === 0 || target === nums[0]) return 1;
      return 0;
    }
    if (ind === 0) return nums[ind] <= target ? 1 : 0; // Reached the beginning of the array
    if (dp[ind][target] !== -1) return dp[ind][target];

    let notPick = f(ind - 1, target); // Number of subsequences without including the current element
    let pick = 0;
    if (nums[ind] <= target) {
      pick = f(ind - 1, target - nums[ind]);
    }

    dp[ind][target] = (notPick + pick) % mod; // Total number of valid subsequences// Store the result
    return dp[ind][target];
  }

  return f(m - 1, (totalSum - d) / 2, 3);
};

const num1 = [1, 1, 1, 1];
let target = 9;
console.log(numSubseq(num1, target, 0));
