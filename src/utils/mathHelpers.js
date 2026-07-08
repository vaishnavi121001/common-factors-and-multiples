export function getFactors(n) {
  const factors = [];
  for (let i = 1; i <= Math.sqrt(n); i++) {
    if (n % i === 0) {
      factors.push(i);
      if (i !== n / i) {
        factors.push(n / i);
      }
    }
  }
  return factors.sort((a, b) => a - b);
}

export function getMultiples(n, count) {
  const multiples = [];
  for (let i = 1; i <= count; i++) {
    multiples.push(n * i);
  }
  return multiples;
}

export function getCommonFactors(a, b) {
  const factorsA = getFactors(a);
  const factorsB = getFactors(b);
  return factorsA.filter(f => factorsB.includes(f));
}

export function getCommonMultiples(a, b, count, searchLimit = 1000) {
  const common = [];
  let current = 1;
  while (common.length < count && current <= searchLimit) {
    if (current % a === 0 && current % b === 0) {
      common.push(current);
    }
    current++;
  }
  return common;
}

export function getGreatestCommonFactor(a, b) {
  const common = getCommonFactors(a, b);
  return common.length > 0 ? common[common.length - 1] : 1;
}

export function getSmallestCommonMultiple(a, b) {
  let current = Math.max(a, b);
  while (true) {
    if (current % a === 0 && current % b === 0) {
      return current;
    }
    current++;
  }
}
