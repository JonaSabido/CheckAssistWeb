import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiService, FilterParams, getParams } from 'shared/services/api.service';
import { User } from '../interfaces/user.interface';
import { Observable } from 'rxjs';
import { Exists } from '../interfaces/apiresponses.interface';

@Injectable({
    providedIn: 'root'
})

export class UserService extends ApiService<User>{
    constructor(http: HttpClient) {
        super(http);
    }

    public root(): string {
        return 'users';
    }

    public existsByEmail(email: string): Observable<Exists> {
        return this.http.get<Exists>(`${this.uri}/exists/byemail`, {
            params: {
                email: email
            }
        });
    }


}