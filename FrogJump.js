// There is a frog on the '1st' step of an 'N' stairs long staircase. The frog wants to reach the 'Nth' stair. 'HEIGHT[i]' is the height of the '(i+1)th' stair.If Frog jumps from 'ith' to 'jth' stair, the energy lost in the jump is given by
// absolute value of ( HEIGHT[i-1] - HEIGHT[j-1] ). If the Frog is on 'ith' staircase, he can jump either to '(i+1)th' stair or to '(i+2)th' stair. Your task is to find the minimum total energy used by the frog to reach from '1st' stair to 'Nth' stair.

// For Example
// If the given ‘HEIGHT’ array is [10,20,30,10], the answer 20 as the frog can jump from 1st stair to 2nd stair (|20-10| = 10 energy lost) and then a jump from 2nd stair to last stair (|10-20| = 10 energy lost). So, the total energy lost is 20.
// Detailed explanation ( Input/output format, Notes, Images )

// Sample Input 1:
// 2
// 4
// 10 20 30 10
// 3
// 10 50 10
// Sample Output 1:
// 20
// 0
// Explanation of sample input 1:
// For the first test case,
// The frog can jump from 1st stair to 2nd stair (|20-10| = 10 energy lost).
// Then a jump from the 2nd stair to the last stair (|10-20| = 10 energy lost).
// So, the total energy lost is 20 which is the minimum.
// Hence, the answer is 20.

// T.C = O(n) => Reduces the overlapping recursive calls as it stores the result of all the rescursive calls in dp
// S.C = O(n) => As the array is n + 1 length. So it is stroing all the values
function frogJump(n, heights) {
  const dp = new Array(n + 1).fill(-1);

  function f(ind) {
    // no use of energy on staying on that step
    if (ind === 0) return 0;

    if (dp[ind] !== -1) return dp[ind];

    // Check the absolute value for energy loss
    let left = f(ind - 1) + Math.abs(heights[ind] - heights[ind - 1]);
    let right = Infinity;
    if (ind > 1) {
      right = f(ind - 2) + Math.abs(heights[ind] - heights[ind - 2]);
    }
    return (dp[ind] = Math.min(left, right));
  }
  return f(n - 1);
}
const heights1 = [10, 20, 30, 10];
console.log(frogJump(heights1.length, heights1)); // Output: 20

const heights2 = [10, 50, 10];
console.log(frogJump(heights2.length, heights2)); // Output: 0

// THE TABULATION OF THIS IS:-

// function frogJump(n, heights) {
//   const dp = new Array(n + 1).fill(0);

//   dp[0] = 0;

//   for (let i = 1; i <= n; i++) {
//     let left = dp[i - 1] + Math.abs(heights[i] - heights[i - 1]);
//     let right = Infinity;
//     if (i > 1) {
//       right = dp[i - 2] + Math.abs(heights[i] - heights[i - 2]);
//     }
//     dp[i] = Math.min(left, right);
//   }
//   return dp[n];
// }

// const heights1 = [10, 20, 30, 10];
// console.log(frogJump(heights1.length - 1, heights1)); // Output: 20
