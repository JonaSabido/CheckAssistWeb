import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiService } from 'shared/services/api.service';
import { CheckUser } from '../interfaces/checkuser.interface';
import { List, OnlyEntity } from '../interfaces/apiresponses.interface';
import { Observable } from 'rxjs';
import { CheckUserStatusValues } from 'shared/utils/constants';

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

    public getByMeeting(idMeeting: number): Observable<List<CheckUser>> {
        return this.http.get<List<CheckUser>>(`${this.uri}/bymeeting/${idMeeting}`);
    }

    public changeStatus(id: number, status: CheckUserStatusValues): Observable<OnlyEntity<CheckUser>> {
        return this.http.put<OnlyEntity<CheckUser>>(`${this.uri}/changestatus/${id}`, {
            status: status
        });
    }

}