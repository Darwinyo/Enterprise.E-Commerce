import { Directive, Input, forwardRef } from '@angular/core';
import { NG_VALIDATORS, Validator, AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function backEndValidator(message: string): ValidatorFn {
  return (control: AbstractControl): ValidationErrors => {
    return { 'backend': { error: message } };
  };
}
@Directive({
  // tslint:disable-next-line:directive-selector
  selector: '[appAuthBackendValidator]',
  providers: [{ provide: NG_VALIDATORS, useExisting: forwardRef(() => BackEndValidatorDirective), multi: true }]
})
export class BackEndValidatorDirective implements Validator {
  @Input()
  get message() {
    return this._message;
  }
  set message(value: string) {
    this._message = value;
    if (this._onChange) {
      console.log(value);
      this._onChange();
    }
  }
  private _message: string;
  private _onChange: () => void;
  constructor() { }
  validate(c: AbstractControl): ValidationErrors {
    return this.message !== null ? backEndValidator(this.message)(c) : null;
  }
  registerOnValidatorChange?(fn: () => void): void {
    this._onChange = fn;
  }
}
