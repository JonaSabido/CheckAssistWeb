import { Injectable } from '@angular/core';
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthUser } from 'src/app/interfaces/auth.interface';
import { JwtService } from 'src/app/services/jwt.service';

@Injectable({
    providedIn: 'root'
})
export class OrganizerGuard {

    constructor(
        private router: Router,
        private jwtService: JwtService,
    ) { }

    canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {

        const token = this.jwtService.getToken()

        if (!this.jwtService.isTokenValid(token)) {
            this.router.navigate(['/'])
            return false
        }
        const authUser = this.jwtService.getData(this.jwtService.getToken())

        if (authUser.id_profile == 2) {
            return true
        }
        else {
            this.router.navigate(['/'])
            return false;
        }
    }

}