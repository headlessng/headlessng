import * as result from './index';

describe('@headlessng/components', () => {
  it('should only export an empty object from root level of package', () => {
    expect(result).toEqual({ default: {} });
  });
});
