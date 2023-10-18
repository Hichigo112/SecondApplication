import {FormGroup, ValidationErrors, ValidatorFn} from '@angular/forms';

export function checkPasswords(): ValidatorFn {
  // @ts-ignore
  return (form: FormGroup): ValidationErrors => {

    const password = form.get('password')?.value;

    const confirmPassword = form.get('confirmPassword')?.value

    if (password === confirmPassword) {

      return {identical: null};
    }

    return {identical: true};
  }
}
