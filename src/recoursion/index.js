import { factorial } from './factorial';

const assert = n => console.log(`factprial(${n}) = ${factorial(n)}`);

console.log('--- facotrial start ---');
assert(1);
assert(2);
assert(3);
assert(4);
assert(5);
console.log('--- facotrial end ---');
