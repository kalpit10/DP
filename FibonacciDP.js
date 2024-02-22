// T.C = O(n), S.C = O(n)

function fibonacci(n, memo = {}) {
  if (n <= 1) return n;

  if (n in memo) {
    return memo[n];
  } else {
    memo[n] = fibonacci(n - 1, memo) + fibonacci(n - 2, memo);
  }
  return memo[n];
}

const n = 10;
console.log(fibonacci(n));
