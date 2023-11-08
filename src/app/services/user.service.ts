import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiService, FilterParams, getParams } from 'shared/services/api.service';
import { User } from '../interfaces/user.interface';

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



}