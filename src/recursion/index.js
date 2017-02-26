System.import('./factorial').then(({ factorial }) => {

  console.log('--- facotrial start ---');

  const assertFacotrial = n => console.log(`factprial(${n}) = ${factorial(n)}`);

  assertFacotrial(1);
  assertFacotrial(2);
  assertFacotrial(3);
  assertFacotrial(5);

  console.log('--- facotrial end ---');
});

System.import('./factorialAccumulator').then(({ factorialAccumulator }) => {

  console.log('--- facotrialAccumulator start ---');

  const assertFactorialAccumulator = n => console.log(`factorialAccumulator(${n}) = ${factorialAccumulator(n)}`);

  assertFactorialAccumulator(1);
  assertFactorialAccumulator(2);
  assertFactorialAccumulator(3);
  assertFactorialAccumulator(5);

  console.log('--- facotrialAccumulator end ---');
});

System.import('./sum').then(({ sum }) => {

  console.log('--- sum start ---');

  const assertSum = xs => console.log(`sum(${xs}) = ${sum(xs)}`);

  assertSum([]);
  assertSum([1]);
  assertSum([1,2,3]);
  assertSum([-1,-2,-3]);

  console.log('--- sum end ---');
});
