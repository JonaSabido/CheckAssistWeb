import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertSaveError, AlertSaveSuccess } from 'shared/utils/alerts';
import { User } from 'src/app/interfaces/user.interface';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent {

  showSuccess: boolean = false
  showError: boolean = false
  showLoading: boolean = false;
  showLoadingSave: boolean = false;


  user: User = {
    id: 0,
    name: '',
    last_name: '',
    id_profile: 0,
    email: '',
    password: ''
  }

  constructor(
    private authService: AuthService,
    private userService: UserService,
    private router: Router,
    private route: ActivatedRoute
  ) {

  }

  ngOnInit() {
    this.getData()
  }

  onSubmit() {
    this.showLoadingSave = true
    this.showError = false
    this.showSuccess = false
    this.userService.update(this.user.id, this.user).subscribe({
      next: (response) => {
        this.showLoadingSave = false
        AlertSaveSuccess()
        this.showSuccess = true
        localStorage.removeItem('token_checkassist_app')
        this.router.navigate(['/login'], { relativeTo: this.route });
      },
      error: (e) => {
        this.showLoadingSave = false
        AlertSaveError()
        this.showError = true
      }
    })
  }

  getData() {
    this.showLoading = true
    this.authService.userByToken().subscribe(response => {
      this.showLoading = false
      this.user = response.data
    })
  }

}
