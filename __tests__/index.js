describe('hooks test', () => {
  it('should be a function', () => {
    expect(require('../src/index').default).toEqual(expect.any(Function));
  });
});