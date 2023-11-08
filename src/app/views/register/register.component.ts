import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PROPERTIES_FILLED } from 'src/app/consts/functions';
import { RegisterPayload } from 'src/app/interfaces/auth.interface';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {

  showError: boolean = false
  dataRegister: RegisterPayload = {
    name: '',
    last_name: '',
    email: '',
    password: ''
  }

  constructor(
    private service: AuthService,
    public route: ActivatedRoute,
    public router: Router
  ) { }

  sendRegister() {
    if (PROPERTIES_FILLED(this.dataRegister)) {
      this.service.register(this.dataRegister).subscribe({
        next: (response) => {
          this.router.navigate(['/login'], { relativeTo: this.route });
        },
        error: (e) => {
          this.showError = true
        }
      })
    }
  }


}
