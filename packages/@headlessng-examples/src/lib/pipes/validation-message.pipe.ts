import { Pipe, PipeTransform } from '@angular/core';

const mockMessages: Record<string, string> = {
  required: 'Completing this field is mandatory.'
};

@Pipe({
  name: 'validationMessage',
  standalone: true
})
export class ValidationMessagePipe implements PipeTransform {
  public transform(key: string): string {
    return mockMessages[key] || key;
  }
}
