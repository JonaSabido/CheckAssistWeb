import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoginPayload, LoginSuccess, RegisterPayload } from '../interfaces/auth.interface';
import { API_URL } from '../consts/urls';
import { User } from '../interfaces/user.interface';
import { OnlyEntity } from '../interfaces/apiresponses.interface';
import { JwtService } from './jwt.service';

@Injectable({
    providedIn: 'root'
})

export class AuthService {

    private readonly api: string = API_URL
    private readonly uri: string = 'auth'

    constructor(
        private http: HttpClient,
        private jwtService: JwtService
    ) {
    }

    public login(e: LoginPayload): Observable<LoginSuccess> {
        return this.http.post<LoginSuccess>(`${this.api}/${this.uri}/login`, e);
    }

    public register(e: RegisterPayload): Observable<User> {
        return this.http.post<User>(`${this.api}/${this.uri}/registerweb`, e);
    }

    public userByToken(): Observable<OnlyEntity<User>> {
        return this.http.get<OnlyEntity<User>>(`${this.api}/${this.uri}/userbytoken`, {
            headers: {
                "Authorization": "Bearer " + this.jwtService.getToken()
            }
        });
    }
}