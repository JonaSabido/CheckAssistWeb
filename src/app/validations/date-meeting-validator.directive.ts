import { Directive } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, ValidationErrors, Validator } from '@angular/forms';
import { TODAY } from 'shared/utils/constants';

@Directive({
  selector: '[dateMeetingValidator]',
  providers: [{ provide: NG_VALIDATORS, useExisting: DateMeetingValidatorDirective, multi: true }]

})
export class DateMeetingValidatorDirective implements Validator {

  today = TODAY()

  validate(control: AbstractControl): ValidationErrors {
    const value = <string>control.value

    if (value < this.today) {
      return { 'dateMeetingValidator': { 'message': 'La fecha seleccionada no puede ser antes a la fecha de hoy' } }
    }

    return {};

  }

  constructor() { }

}
