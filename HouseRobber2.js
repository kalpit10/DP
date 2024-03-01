// LC PROBLEM 213

// Same as that of house robber but now the condition is the houses are in circular manner
// [2,1,3] => 3 as 2,2 are adjacent
//[1,2,3,1] => [1,3] as 1,1 is adjacent cannot be compared

function rob(nums) {
  let n = nums.length;

  if (n === 0) return 0;
  //   if (n === 1) return nums[0];
  if (n < 4) return Math.max(...nums);

  function findMax(start, end) {
    let prev = 0;
    let cur = 0;

    for (let i = start; i <= end; i++) {
      const temp = cur;
      cur = Math.max(prev + nums[i], cur);
      prev = temp;
    }
    return cur;
  }
  // start from first house and leave last house
  const max1 = findMax(0, n - 2);
  // start from second house till end and leave first house
  const max2 = findMax(1, n - 1);

  return Math.max(max1, max2);
}

const nums = [1, 2, 3];
console.log(rob(nums));
