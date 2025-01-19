import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function startsWithValidator(startText: string): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    if (!control.value) {
      return null;
    }

    return control.value.startsWith(startText)
      ? null
      : { startsWith: { requiredStart: startText, actualValue: control.value } };
  };
}