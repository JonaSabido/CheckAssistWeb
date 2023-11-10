import { Directive, Input } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, ValidationErrors, Validator } from '@angular/forms';

@Directive({
  selector: '[startHourValidator]',
  providers: [{ provide: NG_VALIDATORS, useExisting: StartHourValidatorDirective, multi: true }]

})
export class StartHourValidatorDirective implements Validator {

  @Input() endHour: string = '23:59';


  validate(control: AbstractControl): ValidationErrors {

    const value = <string>control.value

    if (this.endHour == '') {
      return {}
    }

    if (value == '') {
      return {}
    }

    if (value > this.endHour) {
      return { 'startHourValidator': { 'message': 'La hora de entrada no puede ser despues a la hora de salida' } }
    }

    if (value == this.endHour) {
      return { 'startHourValidator': { 'message': 'La hora de entrada no puede ser igual a la hora de salida' } }
    }

    return {};

  }

  constructor() { }

}
