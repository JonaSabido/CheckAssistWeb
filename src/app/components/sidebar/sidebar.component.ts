import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthUser } from 'src/app/interfaces/auth.interface';
import { AuthService } from 'src/app/services/auth.service';
import { JwtService } from 'src/app/services/jwt.service';
// import { IconHome } from 'src/app/icons/icons-sidebar'

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {
  constructor(
    private jwtService: JwtService,
    private router: Router,
    private route: ActivatedRoute
  ) {
  }

  userLogged: AuthUser = this.jwtService.getData()

  logOut() {
    localStorage.removeItem('token_checkassist_app')
    this.router.navigate(['/login'], { relativeTo: this.route });
  }




}
