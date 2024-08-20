/* eslint-disable @typescript-eslint/no-namespace */
export type CheckboxChecked = boolean | 'mixed';
export type CheckboxState = 'checked' | 'mixed' | 'unchecked';

export function stateFromChecked(value: CheckboxChecked): CheckboxState {
  switch (value) {
    case false:
      return 'unchecked';
    case 'mixed':
      return 'mixed';
    case true:
      return 'checked';
  }
}
