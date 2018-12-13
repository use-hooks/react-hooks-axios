const hooks = require('../src/index').default;

describe('hooks test', () => {
  it('should be a function', () => {
    expect(hooks).toEqual(expect.any(Function));
  });
});
