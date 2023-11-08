import { Injectable, Inject } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable } from 'rxjs';
import { AuthUser } from '../interfaces/auth.interface';


@Injectable({
    providedIn: 'root'
})

export class JwtService {

    constructor(
        private helper: JwtHelperService
    ) { }

    public getData(token: string): AuthUser {
        const payload = this.helper.decodeToken(token)

        const authUser: AuthUser = {
            id: payload['authUser'].id,
            id_profile: payload['authUser'].id_profile,
            name: payload['authUser'].name,
            last_name: payload['authUser'].last_name
        }

        return authUser;
    }

    public isTokenValid(token: string): boolean {
        return !this.helper.isTokenExpired(token)
    }

    public getToken() {
        return localStorage.getItem("token_checkassist_app") || ''
    }
}