import { stateFromValue } from './checkbox.interface';

describe('@headlessng/primitives/checkbox', () => {
  describe('stateFromValue', () => {
    it('should correctly map the checkbox value to the state', async () => {
      expect(stateFromValue(true)).toBe('checked');
      expect(stateFromValue('mixed')).toBe('mixed');
      expect(stateFromValue(false)).toBe('unchecked');
    });
  });
});
