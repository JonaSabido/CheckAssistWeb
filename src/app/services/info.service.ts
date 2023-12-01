import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiService, FilterParams, getParams } from 'shared/services/api.service';
import { Meeting } from '../interfaces/meeting.interface';
import { Observable } from 'rxjs';
import { List, OnlyEntity } from '../interfaces/apiresponses.interface';
import { RegisterForMeeting, Total } from '../interfaces/info.interface';

@Injectable({
    providedIn: 'root'
})

export class InfoService extends ApiService<Meeting>{
    constructor(http: HttpClient) {
        super(http);
    }

    public root(): string {
        return 'dashboard';
    }

    public getRegistersForMeetingsByUser(): Observable<List<RegisterForMeeting>> {
        return this.http.get<List<RegisterForMeeting>>(`${this.uri}/registersformeetings`);
    }
    
    public getAllRegistersByOrganizer(): Observable<OnlyEntity<Total>> {
        return this.http.get<OnlyEntity<Total>>(`${this.uri}/allregistersbyorganizer`);
    }

    public getTotalMeetingsByUser(): Observable<OnlyEntity<Total>> {
        return this.http.get<OnlyEntity<Total>>(`${this.uri}/totalmeetings`);
    }

}