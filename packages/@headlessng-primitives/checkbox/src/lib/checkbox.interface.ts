/* eslint-disable @typescript-eslint/no-namespace */
export type CheckboxValue = boolean | 'mixed';
export type CheckboxState = 'checked' | 'mixed' | 'unchecked';

export function stateFromValue(value: CheckboxValue): CheckboxState {
  switch (value) {
    case false:
      return 'unchecked';
    case 'mixed':
      return 'mixed';
    case true:
      return 'checked';
  }
}
