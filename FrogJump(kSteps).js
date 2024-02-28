// Frog can jump k steps instead of 1 or 2. Now calculate the minimum energy lost.

// T.C = O(n * k) => where n is the number of steps and k is the maximum number of steps the frog can jump at once.
// S.C = O(n) =>  due to the usage of the dynamic programming array dp, which has a length of n+1. Each element in the array stores the minimum energy required to reach that step.

function frogJump(n, heights, k) {
  const dp = new Array(n + 1).fill(-1);

  function f(ind) {
    if (ind === 0) return 0;

    // Initialize minEnergy inside the function
    let minEnergy = Infinity;

    if (dp[ind] !== -1) return dp[ind];

    for (let i = 1; i <= k; i++) {
      if (ind - i >= 0) {
        let energy = f(ind - i) + Math.abs(heights[ind] - heights[ind - i]);
        minEnergy = Math.min(minEnergy, energy);
      }
    }
    return (dp[ind] = minEnergy);
  }
  return f(n - 1);
}

const heights1 = [10, 20, 30, 10];
console.log(frogJump(heights1.length, heights1, 2)); // Output: 10

const heights2 = [10, 30, 20, 0];
console.log(frogJump(heights2.length, heights2, 3)); // Output: 10
