import { Directive } from '@angular/core';
import { AbstractControl, AsyncValidator, NG_ASYNC_VALIDATORS, ValidationErrors } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { UserService } from '../services/user.service';

@Directive({
  selector: '[emailUniqueValidator]',
  providers: [{ provide: NG_ASYNC_VALIDATORS, useExisting: EmailUniqueValidatorDirective, multi: true }]
})
export class EmailUniqueValidatorDirective implements AsyncValidator {

  constructor(private userService: UserService) { }

  validate(control: AbstractControl): Promise<ValidationErrors> | Observable<ValidationErrors> {
    const email = control.value;
    return this.userService.existsByEmail(email).pipe(
      map(response => {
        return response.exists ? { emailUniqueValidator: true } : {};
      }),
    );
  }
}