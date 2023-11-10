import { Directive, Input } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, ValidationErrors, Validator } from '@angular/forms';

@Directive({
  selector: '[endHourValidator]',
  providers: [{ provide: NG_VALIDATORS, useExisting: EndHourValidatorDirective, multi: true }]

})
export class EndHourValidatorDirective implements Validator {

  @Input() startHour: string = '';


  validate(control: AbstractControl): ValidationErrors {

    const value = <string>control.value

    if (this.startHour == '') {
      return {}
    }

    if (value == '') {
      return {}
    }

    if (value < this.startHour) {
      return { 'endHourValidator': { 'message': 'La hora de salida no puede ser antes a la hora de entarda' } }
    }

    if (value == this.startHour) {
      return { 'endHourValidator': { 'message': 'La hora de salida no puede ser igual a la hora de entarda' } }
    }

    return {};

  }

  constructor() { }

}
