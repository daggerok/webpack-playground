import SomeModule from './some-module';

describe('some-module', () => {
  it('just should work', () => {
    expect('hi').to.equals('hi');
  });
  // skip always failing test
  xit('just also should work', () => {
    throw Error('oops.');
  });
});
