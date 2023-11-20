import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PROPERTIES_FILLED } from 'src/app/consts/functions';
import { LoginPayload } from 'src/app/interfaces/auth.interface';
import { AuthService } from 'src/app/services/auth.service';
import { JwtService } from 'src/app/services/jwt.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  showError: boolean = false
  dataLogin: LoginPayload = {
    email: '',
    password: ''
  }

  constructor(
    private service: AuthService,
    private jwtService: JwtService,
    public route: ActivatedRoute,
    public router: Router
  ) { }



  sendLogin() {
    if (PROPERTIES_FILLED(this.dataLogin)) {
      this.service.login(this.dataLogin).subscribe({
        next: (response) => {
          const authUser = this.jwtService.getData(response.token)
          if (authUser.id_profile == 2 || authUser.id_profile == 1) {
            localStorage.setItem('token_checkassist_app', response.token)
            if (authUser.id_profile == 2) {
              this.router.navigate(['/my-meetings'], { relativeTo: this.route });
            }
            else if (authUser.id_profile == 1) {
              this.router.navigate(['/meetings'], { relativeTo: this.route });
            }
          }
          else {
            this.showError = true
          }
        },
        error: (e) => {
          this.showError = true
        }
      })
    }
  }
}
