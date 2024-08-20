import { stateFromChecked } from './checkbox.interface';

describe('@headlessng/primitives/checkbox', () => {
  describe('stateFromChecked', () => {
    it('should correctly map the checkbox value to the state', async () => {
      expect(stateFromChecked(true)).toBe('checked');
      expect(stateFromChecked('mixed')).toBe('mixed');
      expect(stateFromChecked(false)).toBe('unchecked');
    });
  });
});
