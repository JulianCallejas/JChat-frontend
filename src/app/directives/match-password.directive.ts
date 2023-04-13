import { Directive, Input } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, Validator, ValidatorFn } from '@angular/forms';

@Directive({
  selector: '[matchPassword]',
  providers: [{ provide: NG_VALIDATORS, useExisting: MatchPasswordDirective, multi: true }]
})
export class MatchPasswordDirective {

  @Input('matchPassword') matchTo: string;

  constructor() { }

  validate(control: AbstractControl): { [key: string]: any } | null {
    const value = control.value;
    const match = this.matchTo ? control.root.get(this.matchTo).value === value : false;
    return !match ? { matchPassword: { value } } : null;
  }

}
