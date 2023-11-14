import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiService } from 'shared/services/api.service';
import { CheckUser } from '../interfaces/checkuser.interface';

@Injectable({
    providedIn: 'root'
})

export class CheckUserService extends ApiService<CheckUser>{
    constructor(http: HttpClient) {
        super(http);
    }

    public root(): string {
        return 'checksusers';
    }

}